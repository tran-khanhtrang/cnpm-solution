import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Select } from 'antd';

const { Option } = Select;

const RevenueChart = ({ data }) => {
    const [filter, setFilter] = useState('day'); // 'day', 'week', 'month'

    const chartData = useMemo(() => {
        if (!data || !data.length) return [];

        const aggregated = {};

        data.forEach((order) => {
            // Chỉ tính các đơn hàng đã thanh toán
            if (!order.isPaid) return;

            const date = new Date(order.createdAt);
            let key = '';

            if (filter === 'day') {
                // Format: YYYY-MM-DD
                key = date.toISOString().split('T')[0];
            } else if (filter === 'week') {
                const currentDate = new Date(date.getTime());
                const startDate = new Date(currentDate.getFullYear(), 0, 1);
                const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
                const weekNumber = Math.ceil((days + startDate.getDay() + 1) / 7);
                key = `Tuần ${weekNumber} - ${date.getFullYear()}`;
            } else if (filter === 'month') {
                // Format: YYYY-MM
                key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            }

            if (!aggregated[key]) {
                aggregated[key] = { name: key, revenue: 0 };
            }
            aggregated[key].revenue += order.totalPrice;
        });

        const result = Object.values(aggregated).sort((a, b) => a.name.localeCompare(b.name));
        return result;
    }, [data, filter]);

    const yAxisFormatter = (value) => {
        if (value >= 1000000) {
            return `${(value / 1000000).toFixed(1)} Tr`;
        }
        return `${(value / 1000).toFixed(0)} K`;
    };

    const tooltipFormatter = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };

    return (
        <div style={{ width: '100%', height: 260 }}>
            <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0, fontSize: '16px' }}>Biểu đồ doanh thu</h3>
                <Select value={filter} onChange={setFilter} style={{ width: 140 }}>
                    <Option value="day">Theo ngày</Option>
                    <Option value="week">Theo tuần</Option>
                    <Option value="month">Theo tháng</Option>
                </Select>
            </div>
            <ResponsiveContainer width="100%" height="85%">
                <BarChart
                    data={chartData}
                    margin={{
                        top: 10, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={yAxisFormatter} />
                    <Tooltip formatter={tooltipFormatter} />
                    <Legend />
                    <Bar dataKey="revenue" name="Doanh thu" fill="#8884d8" barSize={30} radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RevenueChart;
