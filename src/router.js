import React from 'react';
import { AllDeals } from './components';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Router = () => {

    return (
        <BrowserRouter>
            <Routes>                                           
                <Route path="/" element={<AllDeals />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;