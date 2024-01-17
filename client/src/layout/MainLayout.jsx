import React from 'react'
import { Col, Row } from 'antd';
import NavBar from '../components/NavBar'
import UserBar from '../components/UserBar'
import Tasks from '../pages/Tasks';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <>
            <NavBar />
            <Row>
                <Col xs={{ span: 22, offset: 1 }} sm={{ span: 20, offset: 2 }} md={{ span: 16, offset: 4 }} lg={{ span: 12, offset: 6 }} xl={{ span: 12, offset: 6 }}>
                    <Row>
                        <Col span={24}>
                            <UserBar />
                        </Col>
                    </Row>
                    <Row>
                        {/* Space for outlet */}
                        <Col span={24}>
                            <Outlet />
                        </Col>
                    </Row>

                </Col>
            </Row>


        </>
    )
}

export default MainLayout