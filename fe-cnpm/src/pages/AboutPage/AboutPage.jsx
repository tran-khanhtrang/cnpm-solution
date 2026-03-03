import React from 'react'
import { Card, Typography, List, Tag, Divider, Space } from 'antd'
import { TeamOutlined, CodeOutlined, RocketOutlined, HomeOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent'

const { Title, Paragraph, Text } = Typography

const AboutPage = () => {
    const navigate = useNavigate()

    const members = [
        { name: 'Phùng Khắc Toàn', role: 'Thành viên' },
        { name: 'Trần Khánh Trang', role: 'Thành viên' },
        { name: 'Vũ Đức Thắng', role: 'Thành viên' },
        { name: 'Vũ Anh Đức', role: 'Thành viên' },
    ]

    const technologies = [
        { category: 'Frontend', items: ['ReactJS', 'Redux Toolkit', 'Ant Design', 'Recharts', 'Styled Components'] },
        { category: 'Backend', items: ['Node.js', 'Express', 'Mongoose', 'JWT'] },
        { category: 'Database', items: ['MongoDB'] },
    ]

    return (
        <div style={{ background: '#f5f5fa', minHeight: '100vh' }}>
            <HeaderComponent isHiddenSearch />
            <div style={{ maxWidth: 800, margin: '40px auto', padding: '0 20px' }}>
                <button
                    onClick={() => navigate('/')}
                    style={{
                        marginBottom: 20, cursor: 'pointer', background: 'none', border: 'none',
                        color: '#1890ff', display: 'flex', alignItems: 'center', gap: 5, padding: 0
                    }}>
                    <HomeOutlined /> Quay lại Trang Chủ
                </button>

                <Card bordered={false} style={{ borderRadius: 12, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                    <div style={{ textAlign: 'center', marginBottom: 40 }}>
                        <Title level={2} style={{ color: '#9255FD', marginBottom: 5 }}>Hệ Thống Thương Mại Điện Tử N5</Title>
                        <Text type="secondary" style={{ fontSize: 16 }}>Đồ án Công Nghệ Phần Mềm</Text>
                    </div>

                    <Paragraph style={{ fontSize: 16, lineHeight: 1.8, marginBottom: 30, textAlign: 'justify' }}>
                        Đây là hệ thống mô phỏng quá trình xây dựng dự án phần mềm E-commerce được thực hiện nhầm đáp ứng yêu cầu của đồ án học phần Công nghệ phần mềm. Hệ thống cung cấp đầy đủ các tính năng cho một sàn giao dịch trực tuyến bao gồm: Quản lý giỏ hàng, đặt hàng, xử lý thanh toán, phân cấp thành viên (VIP/Tích lũy) và hệ thống báo cáo KPI quản trị trực quan.
                    </Paragraph>

                    <Divider orientation="left">
                        <Space><TeamOutlined style={{ color: '#1890ff' }} /> <Text strong style={{ fontSize: 18 }}>Danh Sách Nhóm Nhóm 5</Text></Space>
                    </Divider>
                    <List
                        grid={{ gutter: 16, column: 2 }}
                        dataSource={members}
                        renderItem={(item, index) => (
                            <List.Item>
                                <Card size="small" style={{ borderRadius: 8, borderLeft: '4px solid #9255FD' }}>
                                    <Text strong>{index + 1}. {item.name}</Text>
                                    <br />
                                    <Text type="secondary">{item.role}</Text>
                                </Card>
                            </List.Item>
                        )}
                        style={{ marginBottom: 30 }}
                    />

                    <Divider orientation="left">
                        <Space><CodeOutlined style={{ color: '#52c41a' }} /> <Text strong style={{ fontSize: 18 }}>Công Nghệ Ứng Dụng</Text></Space>
                    </Divider>
                    <div>
                        {technologies.map(tech => (
                            <div key={tech.category} style={{ marginBottom: 15 }}>
                                <Text strong style={{ display: 'inline-block', width: 100 }}>{tech.category}:</Text>
                                {tech.items.map(item => (
                                    <Tag color="cyan" key={item} style={{ margin: '0 5px 5px 0' }}>{item}</Tag>
                                ))}
                            </div>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: 50, paddingTop: 20, borderTop: '1px solid #f0f0f0' }}>
                        <Text type="secondary"><RocketOutlined /> Phiên bản v1.0.0 - 2026</Text>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default AboutPage
