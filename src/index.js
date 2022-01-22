import React from 'react';
import ReactDOM from 'react-dom';
import Router from './router.js';
import store from './store.js';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import './styles/antd.less';
import './styles/globals.css';
import { Layout } from 'antd';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>      
      <Layout className='pageLayout'>              
        <Router>          
        </Router>
      </Layout>      
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
