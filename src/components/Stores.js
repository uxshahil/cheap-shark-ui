import React from 'react';
import { SiteHeader } from './';
import { Layout } from 'antd';
const { Content } = Layout;

function Stores() {
  return (
    <>
      <SiteHeader />
      <Content>Stores</Content>
    </>
  );
}

export default Stores;