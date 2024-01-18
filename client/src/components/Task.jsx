import React, { useEffect, useState } from 'react'
import { Badge, Card, Space, Checkbox, Divider, Col, Row, Modal, Form, Button, Input, DatePicker } from 'antd';
import { EditOutlined, DeleteOutlined, CalendarOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { format, parseISO } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken } from '../redux/authSlice';
import { deleteTask, updateTask } from '../redux/taskSlice';
import dayjs from 'dayjs';

const { TextArea } = Input;

const Task = ({ _id, title, description, deadline, status }) => {
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [isDoneTask, setIsDoneTask] = useState(status);
    // const [editedTask, setEditedTask] = useState({ title: title, description: description, deadline: deadline });

    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const [form] = Form.useForm();  // Add this line to create a form instance

    // console.log(deadline);

    useEffect(() => {
        form.setFieldsValue({
            title: title,
            description: description,
            deadline: dayjs(format(new Date(deadline), 'yyyy-MM-dd')),
        });
    }, [title, description, deadline, form]);

    // console.log(form.setFieldsValue);


    const showModal = () => {
        setOpen(true);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    const showEditModal = () => {
        setEditOpen(true);
    };
    const handleEditCancel = () => {
        setEditOpen(false);
    };

    const handleToggleDone = (e) => {
        const isChecked = e.target.checked;
        setIsDoneTask(isChecked);

        const isDoneData = {
            taskId: _id,
            task: { status: isChecked },
            token: token,
        }
        // console.log(isDoneData);
        dispatch(updateTask(isDoneData));
        // dispatch(createTask(taskData));

        // console.log(`checked = ${isChecked}`);
    };

    const handleDelete = () => {
        const deleteData = {
            taskId: _id,
            token: token,
        }
        // console.log(deleteData);
        dispatch(deleteTask(deleteData));
    }


    // console.log(isDoneTask);

    // const onChange = (e) => {
    //     console.log(`checked = ${e.target.checked}`);
    // };

    //  onFinish function to dispatch the registerUser action directly with the form values instead of relying on the state update from setRegistrationData
    const onFinish = (value) => {
        let task = {
            title: value.title,
            description: value.description,
            deadline: value["deadline"].format("YYYY-MM-DD")  //Add your required date format here
        };
        const isEditData = {
            taskId: _id,
            task: task,
            token: token,
        }
        // console.log(isEditData);
        dispatch(updateTask(isEditData));
        handleEditCancel();

        // Reset the form fields
        // form.resetFields();

    };

    let rText = isDoneTask ? "Completed" : "Pending";
    let rColour = isDoneTask ? "green" : "blue";
    // console.log(rText, rColour);

    const deadlineF = format(new Date(deadline), 'dd MMM yyyy');

    return (
        <>
            <Badge.Ribbon text={rText ? rText : "New"} color={rColour ? rColour : "black"}>
                <Card size="middle" className='shadow-md mt-5 bg-slate-50'>
                    <p className=' text-md text-lg mb-4'> <span className=' text-blue-600' onClick={showModal}> <InfoCircleOutlined /> </span> {title ? title : "Default"}  </p>

                    {/* <Divider orientation="left" plain>
                        Action
                    </Divider> */}

                    <div className=''>
                        <Row>
                            <Col xs={24} sm={24} md={24} lg={4}><span className=''> <CalendarOutlined /> {deadlineF ? deadlineF : "NA"} </span></Col>
                            <Col xs={8} sm={8} md={8} lg={4}><span className=''> <Checkbox checked={isDoneTask} onChange={handleToggleDone}> Done </Checkbox> </span></Col>
                            <Col xs={8} sm={8} md={8} lg={4}><a className=' text-gray-800' onClick={showEditModal} ><EditOutlined /> Edit </a></Col>
                            <Col xs={8} sm={8} md={8} lg={4}><a className=' text-red-600' onClick={handleDelete} ><DeleteOutlined /> Delete </a></Col>
                        </Row>
                    </div>

                </Card>
            </Badge.Ribbon>

            {/* Description Modal */}
            <Modal
                open={open}
                title={title || "Default"}
                onCancel={handleCancel}
                footer={null}
            >
                <p>{description || "No description available."}</p>
            </Modal>


            {/* Edit Modal */}
            <Modal
                open={editOpen}
                title="EDIT TASK"
                // title={`EDIT TASK ${title}`}
                onCancel={handleEditCancel}
                footer={null}
            >

                <Form
                    form={form}  // Pass the form instance to the Form component
                    name="edit-task-form"
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
                        <DatePicker size='large' placeholder='Deadline' className=' w-full' />
                        {/* onChange={onChangeCalender}  format="YYYY-MM-DD"*/}
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

        </>
    )
}

export default Task