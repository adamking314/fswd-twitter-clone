// layout.jsx
import React from 'react';
import LogOut from '@src/login/logOut';
import './stylesheet.scss';

const Layout = (props) => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">Twitter Clone </a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/feed">Feed</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/user_page"> Profile</a>
              </li>
            </ul>
          </div>
          <div>
          <LogOut/>
          </div>
        </div>
      </nav>
      <div className="container py-3">
        {props.children}
      </div>
      <footer className="footer p-3 bg-light">
        <div className="ft-container">
            <h2>Twitter Clone </h2>
            <ul className="ft-nav navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/feed">Feed</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/user_page"> Profile</a>
              </li>
            </ul>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default Layout;