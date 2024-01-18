import React, { useEffect, useState } from 'react'
import { Select, Space, Col, Row, Form, Input } from 'antd';
import Task from './Task'
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, selectTaskError, selectTasks, searchTasks, filterStatus, sortDeadlineOrder, filterTasks } from '../redux/taskSlice';
import { selectToken, selectUser } from '../redux/authSlice';


const TaskList = () => {

    const dispatch = useDispatch();
    // const userId = '65a6aaa09a745c1e9a835b4b';
    const token = useSelector(selectToken);
    const userId = useSelector(selectUser)._id;
    // console.log(userId);

    /* const [searchFilter, setSearchFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sortOrder, setSortOrder] = useState(''); */

    const [filterObj, setFilterObj] = useState({
        search: "",
        status: "all",
        sort: ""
    })

    // const [sortField, setSortField] = useState('deadline');
    // const [sortOrder, setSortOrder] = useState('asc');

    // Fetch tasks when the component mounts
    useEffect(() => {
        dispatch(fetchTasks({ userId, token }));
    }, []);

    useEffect(() => {
        dispatch(filterTasks(filterObj));
    }, [filterObj]);

    // useEffect(() => {
    //     dispatch(searchTasks(searchFilter));
    // }, [searchFilter]);

    // useEffect(() => {
    //     dispatch(filterStatus(statusFilter));
    // }, [statusFilter]);

    // useEffect(() => {
    //     dispatch(sortDeadlineOrder(sortOrder));
    // }, [sortOrder]);


    // Access tasks from the Redux store
    const tasks = useSelector(selectTasks);
    const error = useSelector(selectTaskError);
    // console.log(tasks);

    // console.log(statusFilter, sortOrder);

    return (
        <>

            <Row className=''>

                <Col xs={24} sm={24} md={8} lg={6} className='items-center justify-normal pr-5 mb-3'>

                    <Form.Item name="title" >
                        <Input size="large" placeholder="Title" onChange={(e) => {
                            setFilterObj(prev => ({ ...prev, search: e.target.value }))
                        }} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={6} className='items-center justify-normal pr-5 mb-3'>
                    <Select
                        showSearch
                        style={{
                            width: '100%',
                        }}
                        placeholder="Task Filter"
                        size='large'
                        options={[
                            {
                                value: '1',
                                label: 'Default',
                            },
                            {
                                value: false,
                                label: 'Pending',
                            },
                            {
                                value: true,
                                label: 'Completed',
                            },
                        ]}
                        onChange={(value) => {
                            // setStatusFilter(value);
                            setFilterObj(prev => ({ ...prev, status: value }))
                        }}
                    />
                </Col>
                <Col xs={24} sm={24} md={8} lg={6} className=' items-center justify-normal pr-5 mb-3'>
                    <Select
                        showSearch
                        style={{
                            width: '100%',
                        }}
                        placeholder="Sort Deadline"
                        size='large'
                        options={[
                            {
                                value: '1',
                                label: 'Default',
                            },
                            {
                                value: 'asc',
                                label: 'Ascending',
                            },
                            {
                                value: 'desc',
                                label: 'Descending',
                            },
                        ]}
                        onChange={(value) => {
                            // setSortOrder(value);
                            setFilterObj((prev) => ({ ...prev, sort: value }));
                        }}
                    />
                </Col>
            </Row>
            {
                tasks.map((task) => <Task key={task._id} {...task} />)
            }
        </>
    )
}

export default TaskList