import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '@src/layout';
import Login from '@src/login/login';
import './home.scss';


const HomePage = () => {
  return (
    <div>
      <Layout>
        <div className="container"> 
        <h1>Welcome to Twitter</h1>
         <p>Make a tweet, get a following, go viral!</p>
            <Login />
      </div>
      </Layout>
    </div>
  );
};

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <HomePage />,
    document.body.appendChild(document.createElement('div')),
  )
})