import React from 'react'
import { Layout } from 'antd';
const { Footer } = Layout;

const FooterBar = () => {
    return (
        <Footer
            style={{
                textAlign: 'center',
            }}
        >
            Task Manager ©{new Date().getFullYear()} By Oluyomi Godwin
        </Footer>
    )
}

export default FooterBar