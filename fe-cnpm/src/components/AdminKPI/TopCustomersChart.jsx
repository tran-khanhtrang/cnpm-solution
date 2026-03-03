import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Select } from 'antd';

const { Option } = Select;

const TopCustomersChart = ({ data }) => {
    const [filter, setFilter] = useState('revenue'); // 'revenue' or 'orders'

    const chartData = useMemo(() => {
        if (!data || !data.length) return [];
        const aggregated = {};

        data.forEach(order => {
            if (!order.isPaid) return;
            const customerId = order.shippingAddress?.phone || 'Unknown';
            const customerName = order.shippingAddress?.fullName || 'Khách vãng lai';
            const key = `${customerId}`;

            if (!aggregated[key]) {
                const custIdStr = String(customerId);
                aggregated[key] = {
                    id: key,
                    name: customerName,
                    orderCount: 0,
                    revenue: 0,
                    displayName: `${customerName} (${custIdStr.substring(Math.max(0, custIdStr.length - 4))})`
                };
            }
            aggregated[key].orderCount += 1;
            aggregated[key].revenue += order.totalPrice;
        });

        // Tùy theo filter mà sort và lấy Top 10
        let result = Object.values(aggregated);

        if (filter === 'revenue') {
            result.sort((a, b) => b.revenue - a.revenue);
        } else {
            result.sort((a, b) => b.orderCount - a.orderCount);
        }

        return result.slice(0, 10);
    }, [data, filter]);

    const yAxisFormatter = (value) => {
        return value.length > 15 ? value.substring(0, 15) + '...' : value;
    };

    const tooltipFormatter = (value) => {
        if (filter === 'revenue') {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
        }
        return `${value} đơn`;
    };

    return (
        <div style={{ width: '100%', height: 260, display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '15px' }}>Top 10 Khách hàng</h3>
                <Select value={filter} onChange={setFilter} style={{ width: 150 }}>
                    <Option value="revenue">Theo Tổng tiền</Option>
                    <Option value="orders">Theo Số lượng đơn</Option>
                </Select>
            </div>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 0, right: 30, left: 10, bottom: 0 }} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tick={{ fontSize: 11 }} />
                    <YAxis type="category" dataKey="displayName" width={120} tick={{ fontSize: 11 }} tickFormatter={yAxisFormatter} />
                    <Tooltip formatter={tooltipFormatter} />
                    <Bar
                        dataKey={filter === 'revenue' ? "revenue" : "orderCount"}
                        name={filter === 'revenue' ? "Tổng chi tiêu" : "Số lượng đơn"}
                        fill="#ffc658"
                        barSize={10}
                        radius={[0, 4, 4, 0]}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TopCustomersChart;
