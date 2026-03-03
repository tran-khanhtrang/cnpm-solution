import React, { useState, useMemo } from 'react'
import { WrapperHeader } from '../OrderAdmin/style'
import PieChartComponent from '../OrderAdmin/PieChart'
import RevenueChart from '../OrderAdmin/RevenueChart'
import TopSellingChart from './TopSellingChart'
import TopCustomersChart from './TopCustomersChart'
import { useQueryClient } from '@tanstack/react-query'
import { DatePicker, Space, Button } from 'antd'
import { Excel } from "antd-table-saveas-excel";
import { orderContant } from '../../constants'

const { RangePicker } = DatePicker;

const AdminKPI = () => {
    const queryClient = useQueryClient()
    const orders = queryClient.getQueryData(['orders'])
    const [dateRange, setDateRange] = useState(null)

    const filteredOrders = useMemo(() => {
        if (!orders?.data) return [];
        if (!dateRange || !dateRange[0] || !dateRange[1]) return orders.data;

        // Use dayjs dates gracefully since antd 5 RangePicker returns them
        const startDate = new Date(dateRange[0]);
        startDate.setHours(0, 0, 0, 0);
        const start = startDate.getTime();

        const endDate = new Date(dateRange[1]);
        endDate.setHours(23, 59, 59, 999);
        const end = endDate.getTime();

        return orders.data.filter(order => {
            const orderDate = new Date(order.createdAt).getTime();
            return orderDate >= start && orderDate <= end;
        });
    }, [orders, dateRange])

    const exportExcel = () => {
        if (!filteredOrders || !filteredOrders.length) return;
        const excel = new Excel();
        const exportData = filteredOrders.map(order => {
            return {
                id: order._id,
                createdAt: new Date(order.createdAt).toLocaleString('vi-VN'),
                paymentMethod: orderContant.payment[order?.paymentMethod] || order.paymentMethod,
                isPaid: order.isPaid ? 'Đã T.Toán' : 'Chưa T.Toán',
                isDelivered: order.isDelivered ? 'Đã Giao' : 'Chưa Giao',
                totalPrice: order.totalPrice
            }
        })

        excel
            .addSheet("Doanh_thu")
            .addColumns([
                { title: 'Mã đơn', dataIndex: 'id' },
                { title: 'Ngày đặt', dataIndex: 'createdAt' },
                { title: 'Phương thức TT', dataIndex: 'paymentMethod' },
                { title: 'Trạng thái TT', dataIndex: 'isPaid' },
                { title: 'Giao hàng', dataIndex: 'isDelivered' },
                { title: 'Tổng tiền (VND)', dataIndex: 'totalPrice' },
            ])
            .addDataSource(exportData, { str2Percent: true })
            .saveAs("Bao_Cao_KPI.xlsx");
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <WrapperHeader>Thống kê KPI Doanh thu & SP Bán Chạy</WrapperHeader>
                <Space>
                    <RangePicker onChange={(dates) => setDateRange(dates)} format="DD/MM/YYYY" placeholder={['Từ ngày', 'Đến ngày']} size="large" />
                    <Button type="primary" size="large" onClick={exportExcel}>Xuất Báo Cáo (Excel)</Button>
                </Space>
            </div>

            <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start', marginTop: '15px' }}>
                <div style={{ flex: 1, backgroundColor: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    <RevenueChart data={filteredOrders} />
                </div>
            </div>

            <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start', marginTop: '15px', paddingBottom: '20px' }}>
                <div style={{ flex: 1, backgroundColor: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    <TopCustomersChart data={filteredOrders} />
                </div>
                <div style={{ flex: 1, backgroundColor: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    <TopSellingChart data={filteredOrders} />
                </div>
                <div style={{ width: '300px', backgroundColor: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h3 style={{ margin: '0 0 10px 0', textAlign: 'center', fontSize: '15px' }}>Tỉ lệ Phương thức TT</h3>
                    <div style={{ height: 260 }}>
                        <PieChartComponent data={filteredOrders} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminKPI
