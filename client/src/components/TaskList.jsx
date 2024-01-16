import React from 'react'
import Task from './Task'


const TaskList = () => {

    const taskProperties = [
        {
            "id": 1231,
            "title": "Lorem, ipsum dolor sit amet consectetur adipisicing elit, Delectus perferendis.",
            "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit, Delectus perferendis.",
            "deadline": "2024-01-22",
            "status": 1,
            "ribbon": {
                "rText": "Pending",
                "rColour": "blue",
            }
        },
        {
            "id": 121,
            "title": "Delectus perferendis ipsum dolor sit amet consectetur adipisicing elit.",
            "description": "Lorem, ipsum dolor sit amet consectetur adipisicing elit, Delectus perferendis.",
            "deadline": "2024-01-24",
            "status": 1,
            "ribbon": {
                "rText": "Done",
                "rColour": "green",
            }
        },
    ];

    return (
        <>
            {
                taskProperties.map((task) => <Task key={task.id} {...task} />)
            }
            <Task />
            <Task />
            <Task />
            <Task />
        </>
    )
}

export default TaskList