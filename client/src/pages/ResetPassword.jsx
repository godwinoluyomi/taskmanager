import React from 'react'
import { LockOutlined, UserOutlined, MailOutlined, LoginOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';

const ResetPassword = () => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    return (
        <div>

            <p className=' font-extralight text-2xl mb-3'> RESET PASSWORD </p>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
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

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="tmButtonPrimary login-form-button" size='large'>
                        {/* <LoginOutlined /> */}
                        Send Email
                    </Button>

                </Form.Item>
                <Form.Item>
                    <a href="#."> Login </a> OR
                    <a href="#."> Register </a>
                </Form.Item>
            </Form>

        </div>
    )
}

export default ResetPassword