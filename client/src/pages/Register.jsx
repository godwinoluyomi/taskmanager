import React, { useEffect, useState } from 'react'
import { LockOutlined, UserOutlined, MailOutlined, LoginOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, selectAuthError, selectSuccessMessage, selectUser } from '../redux/authSlice';

const Register = () => {
    const navigate = useNavigate();
    const error = useSelector(selectAuthError);
    const message = useSelector(selectSuccessMessage);
    // const user = useSelector(selectUser);

    const dispatch = useDispatch();
    const [registrationData, setRegistrationData] = useState({
        username: '',
        email: '',
        password: '',
    });

    //  onFinish function to dispatch the registerUser action directly with the form values instead of relying on the state update from setRegistrationData
    const onFinish = (values) => {
        dispatch(registerUser(values));
        navigate("/");
    };

    /* const onFinish = (values) => {
        setRegistrationData(values); // This sets the state, but it's asynchronous
        dispatch(registerUser(registrationData));
    }; */


    // Navigate to Login page after user is stored in global state
    /* useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user]) */

    return (
        <div>

            <p className=' font-extralight text-2xl mb-3'> REGISTER </p>
            {error && <p>{error}</p>}
            {message && <p>{message}</p>}
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
                        Register
                    </Button>

                </Form.Item>
                <Form.Item>
                    Already have an account? <Link to={'/login'}> Login </Link>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Register