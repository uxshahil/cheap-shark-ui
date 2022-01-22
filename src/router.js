import React from 'react';
import { Deals, Stores, DealDetail, Games } from './components';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Router = () => {

    return (
        <BrowserRouter>        
            <Routes>
                <Route path="/" element={<Deals />} >
                    <Route path="/deal" element={<DealDetail />} />
                </Route>
                <Route path="/games" element={<Games />} />     
                <Route path="/stores" element={<Stores />} />                
            </Routes>
        </BrowserRouter>
    )
}

export default Router;