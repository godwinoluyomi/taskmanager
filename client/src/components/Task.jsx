import React from 'react'
import { Badge, Card, Space, Checkbox, Divider, Col, Row } from 'antd';
import { EditOutlined, DeleteOutlined, CalendarOutlined } from '@ant-design/icons';


const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
};

const Task = ({ id, title, description, deadline, status, ribbon = {} }) => {
    const { rText, rColour } = ribbon;

    // text = { rText? rText: "New" } color = { rColour? rColour: "black" }

    return (
        <>
            <Badge.Ribbon text="Test" color="black">
                <Card size="middle" className='shadow-md mt-5 bg-slate-50'>
                    <p className=' text-md text-lg mb-4'> {title ? title : "Default"}  </p>

                    {/* <Divider orientation="left" plain>
                        Action
                    </Divider> */}

                    <div className=''>
                        <Row>
                            <Col xs={24} sm={24} md={24} lg={4}><span className=''> <CalendarOutlined /> {deadline ? deadline : "24 Jan 24"} </span></Col>
                            <Col xs={8} sm={8} md={8} lg={4}><a href='#' className=''> <Checkbox onChange={onChange}> Done </Checkbox> </a></Col>
                            <Col xs={8} sm={8} md={8} lg={4}><a href='#' className=''><EditOutlined /> Edit </a></Col>
                            <Col xs={8} sm={8} md={8} lg={4}><a href='#' className=''><DeleteOutlined /> Delete </a></Col>
                        </Row>
                    </div>

                </Card>
            </Badge.Ribbon>
        </>
    )
}

export default Task