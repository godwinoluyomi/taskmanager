import React from 'react'
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space, Col, Row, List } from 'antd';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/authSlice';

const ProfileSetting = () => {

    const { username, email } = useSelector(selectUser);

    return (
        <>

            <div className=' my-10 mb-44'>

                <Row className=''>
                    <Col xs={24} sm={24} md={6} lg={6} className='items-center justify-normal'>

                        <Space direction="vertical" size={16}>
                            <Space wrap size={16}>
                                <Avatar size={150} icon={<UserOutlined />} />
                            </Space>
                        </Space>
                    </Col>
                    <Col xs={24} sm={24} md={18} lg={18} className=' items-center justify-normal'>

                        <List itemLayout="horizontal" >
                            <List.Item>
                                <List.Item.Meta
                                    title={<span style={{ fontWeight: 'bold' }}>Full Name</span>}
                                    description={username ? username : 'Username'}
                                />
                            </List.Item>

                            <List.Item>
                                <List.Item.Meta
                                    title={<span style={{ fontWeight: 'bold' }}>Email Address</span>}
                                    description={email ? email : 'Email'}
                                />
                            </List.Item>
                        </List>
                    </Col>
                </Row>
            </div>

        </>
    )
}

export default ProfileSetting