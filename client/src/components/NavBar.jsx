import React from 'react'
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

const NavBar = () => {
    return (

        <Header className='place-content-center '
            style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'black'
            }}
        >
            <img src='./images/logonamewhite.png' className='logoAdjust ' />
        </Header>
    )
}

export default NavBar