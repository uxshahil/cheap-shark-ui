import React from 'react';
import { Layout, Image, Typography } from 'antd';
import { Navigation } from './';
import '../styles/Header.css';
const { Text } = Typography;
const { Header } = Layout;

function HeaderComponent() {
    return (
        <Header className='header'>
            <div>
                <Image width={60} src="logo.png" className='headerLogo'/>
                <Text className='headerLogoText'>CheapShark</Text>
            </div>
            <Navigation />
        </Header>
    );
}

export default HeaderComponent;
