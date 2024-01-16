import React, { useState } from 'react'
import { UserOutlined, DownOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { Avatar, Badge, Dropdown, Space, Button, Modal, Input, DatePicker } from 'antd';

const onChangeCalender = (date, dateString) => {
    console.log(date, dateString);
};

const { TextArea } = Input;

const items = [
    {
        key: '1',
        label: (
            <a rel="noopener noreferrer" href="#">
                Profile Settings
            </a>
        ),
        icon: <SettingOutlined />,
        disabled: true,
    },
    {
        key: '2',
        label: (
            <a rel="noopener noreferrer" href="#">
                Logout
            </a>
        ),
        icon: <LogoutOutlined />,
    },
];

const UserBar = () => {

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    /* const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
        }, 3000);
    }; */
    const handleCancel = () => {
        setOpen(false);
    };


    return (
        <div className='mt-6 mb-6'>
            <div className='flex float-left'>

                <Button type="primary" onClick={showModal} size='large' className='tmButtonPrimary'>
                    ADD TASK
                </Button>

                <Modal
                    open={open}
                    title="NEW TASK"
                    // onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="back" onClick={handleCancel}>
                            Close
                        </Button>,
                        <Button
                            key="link"
                            href=""
                            type="primary"
                            loading={loading}
                            // onClick={handleOk}
                            className='tmButtonPrimary'
                        >
                            Save
                        </Button>,
                    ]}
                >

                    <div className=' my-6 flex flex-col space-y-4 ' >
                        <Input size="large" placeholder="Title" />
                        <TextArea rows={4} placeholder="Description" maxLength={6} />
                        <DatePicker size='large' placeholder='Deadline' className=' w-full' onChange={onChangeCalender} />
                    </div>

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
                            <span className=' ml-5 font-light text-lg'> Oluyomi Godwin </span>
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>

            </div>
        </div>
    )
}

export default UserBar