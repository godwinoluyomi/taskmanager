import React, { useEffect } from 'react'
import { LockOutlined, MailOutlined, LoginOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser, selectAuthError, selectAuthStatus, selectUser } from '../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
    const navigate = useNavigate();
    // const user = useSelector(selectUser);
    const error = useSelector(selectAuthError);
    const isAuthenticated = useSelector(selectAuthStatus);

    const dispatch = useDispatch();

    const onFinish = (values) => {
        dispatch(loginUser(values));
        // console.log('Received values of form: ', values);
    };

    // Navigate to tasks page after user is stored in global state and isAutthen
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/tasks");
        }
    }, [isAuthenticated])

    return (
        <div>

            <p className=' font-extralight text-2xl mb-3'> LOGIN </p>
            {error && <p> {error} </p>}
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
                        Login
                    </Button>
                    <span className=' float-right'>
                        <Link className="login-form-forgot" to={'/reset-password'}> Forgot password? </Link>
                    </span>

                </Form.Item>
                <Form.Item>
                    Don't have an account? <Link to={'/register'}> Register </Link>
                </Form.Item>
            </Form>

        </div>
    )
}

export default Login