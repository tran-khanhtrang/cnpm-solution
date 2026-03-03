import React from 'react'
import { WrapperHeader } from '../OrderAdmin/style'
import PieChartComponent from '../OrderAdmin/PieChart'
import RevenueChart from '../OrderAdmin/RevenueChart'
import { useQueryClient } from '@tanstack/react-query'

const AdminKPI = () => {
    const queryClient = useQueryClient()
    const orders = queryClient.getQueryData(['orders'])

    return (
        <div>
            <WrapperHeader>Thống kê KPI Doanh thu</WrapperHeader>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', marginTop: '20px' }}>
                <div style={{ height: 350, width: 350, backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h3 style={{ margin: '0 0 10px 0', textAlign: 'center' }}>Phương thức thanh toán</h3>
                    <PieChartComponent data={orders?.data} />
                </div>
                <div style={{ flex: 1, backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                    <RevenueChart data={orders?.data} />
                </div>
            </div>
        </div>
    )
}

export default AdminKPI
