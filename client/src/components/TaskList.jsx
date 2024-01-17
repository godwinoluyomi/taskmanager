import React, { useEffect } from 'react'
import Task from './Task'
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, selectTaskError, selectTasks } from '../redux/taskSlice';
import { selectToken, selectUser } from '../redux/authSlice';


const TaskList = () => {

    const dispatch = useDispatch();
    // const userId = '65a6aaa09a745c1e9a835b4b';
    const token = useSelector(selectToken);
    const userId = useSelector(selectUser)._id;
    // console.log(userId);

    // Fetch tasks when the component mounts
    useEffect(() => {
        dispatch(fetchTasks({ userId, token }));
    }, []);


    // Access tasks from the Redux store
    const tasks = useSelector(selectTasks);
    const error = useSelector(selectTaskError);

    // console.log(tasks);

    return (
        <>
            {
                tasks.map((task) => <Task key={task._id} {...task} />)
            }
        </>
    )
}

export default TaskList