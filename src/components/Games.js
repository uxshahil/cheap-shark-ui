import React from 'react';
import { SiteHeader } from './';
import { Layout } from 'antd';
const { Content } = Layout;

function Games() {
  return (
    <>
      <SiteHeader />
      <Content>Games</Content>
    </>
  );
}

export default Games;