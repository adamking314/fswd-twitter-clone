// Profile.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Layout from './layout';

const Profile = () => (
<Router>
  <Layout>
    <h1> Profile Page </h1>
  </Layout>
  </Router>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Profile />,
    document.body.appendChild(document.createElement('div')),
  )
})