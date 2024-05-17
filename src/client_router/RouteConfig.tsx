
import React from 'react';
import { Routes, Route } from "react-router-dom";

import Home from './Home';
import Counter from './Counter';

export default
(props)=>{
    return (
        <Routes>
            <Route path="/" index element={<Home userList={props.initialData} />} /> 
            <Route path="/counter" element={<Counter  />} /> 
        </Routes>
    )
}