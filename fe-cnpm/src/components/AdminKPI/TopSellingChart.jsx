import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TopSellingChart = ({ data }) => {
    const chartData = useMemo(() => {
        if (!data || !data.length) return [];
        const aggregated = {};
        data.forEach(order => {
            if (!order.isPaid) return;
            order.orderItems?.forEach(item => {
                const name = item.name;
                if (!aggregated[name]) {
                    aggregated[name] = { name: name, quantity: 0, revenue: 0 };
                }
                aggregated[name].quantity += item.amount;
                aggregated[name].revenue += item.amount * item.price;
            });
        });

        // Top 5 theo số lượng bán
        const result = Object.values(aggregated)
            .sort((a, b) => b.quantity - a.quantity)
            .slice(0, 5)
            .map(item => ({
                ...item,
                shortName: item.name.length > 25 ? item.name.substring(0, 25) + '...' : item.name
            }));

        return result;
    }, [data]);

    return (
        <div style={{ width: '100%', height: 260, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ margin: '0 0 10px 0', textAlign: 'center', fontSize: '15px' }}>Top 5 Sản phẩm bán chạy nhất</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 0, right: 30, left: 0, bottom: 0 }} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tick={{ fontSize: 11 }} />
                    <YAxis type="category" dataKey="shortName" width={160} tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="quantity" name="Số lượng đã bán" fill="#82ca9d" barSize={15} radius={[0, 4, 4, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TopSellingChart;
