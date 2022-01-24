import React from 'react';
import { Deals, Stores, DealDetail, Games } from './components';
import { BrowserRouter, Outlet, Routes, Route } from "react-router-dom";
import { Layout } from 'antd';
import { SiteHeader } from './components';
const { Content } = Layout;

const Router = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PageLayout />}>
                    <Route index element={<Deals />} />
                    <Route path="/deals" element={<Deals />} />
                    <Route path="/deals/:id" element={<DealDetail />} />
                    <Route path="/games" element={<Games />} />
                    <Route path="/stores" element={<Stores />} />
                    <Route path="*" element={<NoMatch />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

const NoMatch = () => {
    return (<p>There's nothing here: 404!</p>);
  };

const PageLayout = () => {

    return (
        <>
            <SiteHeader />
            <Content>
                <Outlet />
            </Content>
        </>
    )
}

export default Router;