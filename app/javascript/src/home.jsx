import React from 'react'
import ReactDOM from 'react-dom'

import './home.scss';

const Home = props => (
  <div>
  <h1>Home page react is working</h1>
  <div className="col-xs-12 post-tweet-box">
        <textarea type="text" className="form-control post-input" rows="3" placeholder="What's happening?"></textarea>
        <div className="pull-right">
          <span className="post-char-counter">140</span>
          <button className="btn btn-primary" disabled id="post-tweet-btn">Tweet</button>
        </div>
      </div>
  </div>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div')),
  )
})
