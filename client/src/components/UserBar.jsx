import React, { useState } from 'react'
import { UserOutlined, DownOutlined, SettingOutlined, LogoutOutlined, OrderedListOutlined } from '@ant-design/icons';
import { Menu, Avatar, Badge, Dropdown, Space, Checkbox, Form, Button, Modal, Input, DatePicker } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, selectToken, selectUser } from '../redux/authSlice';
import { createTask } from '../redux/taskSlice';

const { TextArea } = Input;

const UserBar = () => {
    const [open, setOpen] = useState(false);
    // const [deadlineString, setDeadlineString] = useState('');

    const { username, email } = useSelector(selectUser);
    const token = useSelector(selectToken);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/login');
    }

    const showModal = () => {
        setOpen(true);
    };

    // const onChangeCalender = (date, dateString) => {
    //     console.log(dateString);
    //     setDeadlineString(dateString); // Save the dateString in state
    // };

    const handleCancel = () => {
        setOpen(false);
    };

    //  onFinish function to dispatch the registerUser action directly with the form values instead of relying on the state update from setRegistrationData
    const onFinish = (value) => {
        let task = {
            title: value.title,
            description: value.description,
            deadline: value["deadline"].format("YYYY-MM-DD")  //Add your required date format here
        };
        const taskData = {
            task: task,
            token: token,
        }
        console.log(taskData);
        dispatch(createTask(taskData));
        handleCancel();
        // navigate("/");

        // Reset the form fields
        form.resetFields();

    };


    const [form] = Form.useForm();  // Add this line to create a form instance

    const items = [
        {
            key: '1',
            label: (
                <Link to={'/tasks'}> My Tasks </Link>
            ),
            icon: <OrderedListOutlined />,
            // disabled: true,
        },
        {
            key: '2',
            label: (
                <Link to={'/profile'}> Profile </Link>
            ),
            icon: <SettingOutlined />,
            // disabled: true,
        },
        {
            key: '3',
            label: (
                <a rel="noopener noreferrer" onClick={handleLogout}>
                    <span>Logout</span>
                </a>
            ),
            icon: <LogoutOutlined />,
        },
    ];

    return (
        <div className='mt-6 mb-6'>
            <div className='flex float-left'>

                <Button type="primary" onClick={showModal} size='large' className='tmButtonPrimary'>
                    ADD TASK
                </Button>

                <Modal
                    open={open}
                    title="NEW TASK"
                    onCancel={handleCancel}
                    footer={null}
                >

                    <Form
                        form={form}  // Pass the form instance to the Form component
                        name="normal_login"
                        className="login-form"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input task title!',
                                },
                            ]}
                        >
                            <Input size="large" placeholder="Title" />
                        </Form.Item>
                        <Form.Item name="description" >
                            <TextArea rows={4} placeholder="Description" />
                        </Form.Item>
                        <Form.Item
                            name="deadline"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input task dealine!',
                                },
                            ]}
                        >
                            <DatePicker size='large' placeholder='Deadline' className=' w-full' format="YYYY-MM-DD" />
                            {/* onChange={onChangeCalender} */}
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="tmButtonPrimary login-form-button" size='large'>
                                Save
                            </Button>

                        </Form.Item>
                    </Form>

                    {/* <div className=' my-6 flex flex-col space-y-4 ' >
                    </div> */}

                </Modal>
            </div>
            <div className=' flex float-right'>
                <Space size={24}>
                    <Badge count={1}>
                        <Avatar shape="square" icon={<UserOutlined />} />
                    </Badge>

                </Space>

                <Dropdown
                    menu={{
                        items,
                    }}
                >
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            <span className=' ml-5 font-light text-lg'> {username ? username : 'Username'} </span>
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>

            </div>
        </div>
    )
}

export default UserBar