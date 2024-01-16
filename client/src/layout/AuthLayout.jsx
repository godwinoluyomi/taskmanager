import React from 'react'
import { Col, Row } from 'antd';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ResetPassword from '../pages/ResetPassword';

const AuthLayout = () => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    return (
        <div>
            <Row className='h-screen'>
                <Col xs={2} sm={8} md={14} lg={18} className='bg-[url("/images/mainbg.jpg")] bg-cover bg-no-repeat bg-center'>
                    {/* <img src='/images/mainbg.jpg' /> */}
                </Col>
                <Col xs={22} sm={16} md={10} lg={6} className='flex items-center justify-normal px-7'>
                    <div className='w-full'>
                        <div className='my-5'>
                            <img src='/images/logonameblack.png' className=' w-2/4' />
                        </div>

                        <div>
                            <Login />
                            <Register />
                            <ResetPassword />
                        </div>

                    </div>
                </Col>
            </Row>

        </div>
    )
}

export default AuthLayout