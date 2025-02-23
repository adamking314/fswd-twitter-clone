import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Layout from './layout';

import './home.scss';

const Home = () => (
  <Router>
  <Layout>
  <div>
  <h1>Twitter Clone is Showing</h1>
  <div className="col-xs-12 post-tweet-box">
        <textarea type="text" className="form-control post-input" rows="3" placeholder="What's happening?"></textarea>
        <div className="pull-right">
          <span className="post-char-counter">140</span>
          <button className="btn btn-primary" id="post-tweet-btn">Tweet</button>
        </div>
      </div>
  </div>
  </Layout>
  </Router>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div')),
  )
})
