// index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import Tweets from './tweets';

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('params');
  const data = JSON.parse(node.getAttribute('data-params'));

  ReactDOM.render(
    <Tweets tweet={data.tweet} />,
    document.body.appendChild(document.createElement('div')),
  )
})