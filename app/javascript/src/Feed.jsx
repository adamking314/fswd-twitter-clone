import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { getTweets, postTweet, deleteTweet } from '/app/javascript/packs/request.js';
import Layout from './layout';
import { getCurrentUser, countUsersTweets } from '/app/javascript/packs/utils';
import { safeCredentials, handleErrors } from '@src/utils/fetchHelper';

import './feed.scss';

const Feed = () => {


  //    states

  const [tweets, setTweets] = useState([]);
  const [newTweet, setNewTweet] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [characters, setCharacters] = useState(140);
  const [tweetCount, setTweetCount] = useState(0);

  //    map tweets to state

  const listOfTweets = function (response) {
    setTweets(response.tweets.map(tweet => tweet));
  };

  //    handlers 

  const postTweetHandler = function (event) {
    event.preventDefault();
    
    postTweet(newTweet, function (response) {
      if (response.success == false) {
        setErrorMessage("Sorry, there was an error posting your tweet. Please try again");
      }
      else {
        setErrorMessage("");
        getTweets(listOfTweets);
        setNewTweet("");
        setCharacters(140);
        countUsersTweets(response.tweet.username, setTweetCount);
      }
    });
  };


  const tweetInputHandler = function (event) {
    setNewTweet(event.target.value);
    setCharacters(140 - event.target.value.length);
  };

  const deleteTweetHandler = function (event) {
    var id = event.target.dataset.id;
    deleteTweet(id, function () {
      getTweets(listOfTweets);
      countUsersTweets(currentUser, setTweetCount);
    });
  };

  //   get tweets on page load

  useEffect(() => {
    getCurrentUser(function (response) {
      setCurrentUser(response.username);
      countUsersTweets(response.username, setTweetCount);
    });
    getTweets(listOfTweets);
  }, []);

  return(
      <Layout>
        <h1> Twitter Clone Feed </h1>
      <div id="feed" className="container">
        <div className='row'>
          <div className='col-6'>
            <ul>
              <li className="fw-bold"><a href={"/" + currentUser}>@{currentUser}</a></li>
              <li>TWEETS: <a href={"/" + currentUser} className="user-stats-tweets">{tweetCount}</a>
              </li>
              <li>FOLLOWING: 0
              </li>
              <li>FOLLOWERS: 0
              </li>
            </ul>
          </div>
          <div className='col-6'>
            <form onSubmit={postTweetHandler}>
              <textarea
                className="form-control tweet-box"
                id="tweetInput"
                value={newTweet}
                onChange={tweetInputHandler}
                placeholder="What's happening?"
                maxLength="140">
              </textarea>
                <button
                  type="submit"
                  className="btn btn-sm tweet-btn"
                  onSubmit={postTweetHandler}
                  disabled={characters == 140 || characters < 0}>
                  Tweet
                </button>
            </form>
            <p>
              {errorMessage}
            </p>
          </div>
        </div>
        <div className='row'>
          <div className='col-12 twitter-feed'>
            {tweets.map(tweet => {
              if (tweet.username === currentUser) {
                return (
                  <div className="tweet p-3 pb-0" key={tweet.id}>
                    <p className="fw-bold d-inline">{tweet.username}</p>
                    <a href={'/' + tweet.username} className="fw-light ps-1">@{tweet.username}</a>
                    <p className="d-inline date ps-1">{tweet.created_at}</p>
                    <p className="pt-3 fw-light">{tweet.message}</p>
                    <button className="btn btn-sm d-flex ms-auto delete-btn" data-id={tweet.id} onClick={deleteTweetHandler}>Delete</button>
                  </div>
                )
              }
              else {
                return (
                  <div className="tweet pb-4 p-3" key={tweet.id}>
                    <p className="fw-bold d-inline">{tweet.username}</p>
                    <a href={'/' + tweet.username} className="fw-light ps-1">@{tweet.username}</a>
                    <p className="d-inline date ps-1">{tweet.created_at}</p>
                    <p className="pt-3 fw-light">{tweet.message}</p>
                  </div>
                )
              }
            })}
          </div>
        </div>
      </div>
      </Layout>
  )
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Feed />,
    document.body.appendChild(document.createElement('div'))
  )
});