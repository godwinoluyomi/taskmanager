import React from 'react'
import { LockOutlined, UserOutlined, MailOutlined, LoginOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';

const Register = () => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    return (
        <div>

            <p className=' font-extralight text-2xl mb-3'> REGISTER </p>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input size='large' prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Full Name" />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                >
                    <Input size='large' prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email Address" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        size='large'
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="tmButtonPrimary login-form-button" size='large'>
                        {/* <LoginOutlined /> */}
                        Register
                    </Button>

                </Form.Item>
                <Form.Item>
                    Already have an account? <a href="#."> Login </a>
                </Form.Item>
            </Form>

        </div>
    )
}

export default Register