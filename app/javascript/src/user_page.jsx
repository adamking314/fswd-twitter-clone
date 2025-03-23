import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { getUsersTweets, postTweet, deleteTweet } from '/app/javascript/packs/request.js';
import Layout from './layout';
import { getCurrentUser, countUsersTweets } from '/app/javascript/packs/utils';
import './user_page.scss';
import { safeCredentials, handleErrors } from '@src/utils/fetchHelper';

const UserPage = () => {
  const [tweets, setTweets] = useState([]);
  const [newTweet, setNewTweet] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [characters, setCharacters] = useState(140);
  const [tweetCount, setTweetCount] = useState(0);

  useEffect(() => {
    getCurrentUser((response) => {
      setCurrentUser(response.username);
      countUsersTweets(response.username, setTweetCount);
      getUsersTweets(response.username, (res) => setTweets(res.tweets));
    });
  }, []);

 const postTweetHandler = function (event) {
     event.preventDefault();
     
     postTweet(newTweet, function (response) {
       if (response.success == false) {
         setErrorMessage("Sorry, there was an error posting your tweet. Please try again");
       } else {
        setErrorMessage("");
        getUsersTweets(currentUser, (res) => setTweets(res.tweets));
        setNewTweet("");
        setCharacters(140);
        countUsersTweets(currentUser, setTweetCount);
      }
    });
  };
  const deleteTweetHandler = function (event) {
    event.preventDefault();
    
    const id = event.target.dataset.id;
    
    deleteTweet(id, function () {
      getUsersTweets(currentUser, (res) => setTweets(res.tweets));
      countUsersTweets(currentUser, setTweetCount);
    });
  };
  
  
  return (
    <Layout>
      <h1>@{currentUser}'s Tweets</h1>
      <div id="feed" className="container">
        <div className='row'>
          <div className='col-6'>
            <ul>
              <li className="fw-bold"><a href={`/${currentUser}`}>@{currentUser}</a></li>
              <li>TWEETS: <a href={`/${currentUser}`} className="user-stats-tweets">{tweetCount}</a></li>
              <li>FOLLOWING: 0</li>
              <li>FOLLOWERS: 0</li>
            </ul>
          </div>
          <div className='col-6'>
            <form onSubmit={postTweetHandler}>
              <textarea
                className="form-control tweet-box"
                value={newTweet}
                onChange={(e) => {
                  setNewTweet(e.target.value);
                  setCharacters(140 - e.target.value.length);
                }}
                placeholder="What's happening?"
                maxLength="140"
              />
              <button
                type="submit"
                className="btn btn-sm tweet-btn"
                disabled={characters === 140 || characters < 0}>
                Tweet
              </button>
            </form>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
          </div>
        </div>
        <div className='row'>
          <div className='col-12 twitter-feed'>
            {tweets.map((tweet) => (
              <div className="tweet p-3 pb-0" key={tweet.id}>
                <p className="fw-bold d-inline">{tweet.username}</p>
                <a href={`/${tweet.username}`} className="fw-light ps-1">@{tweet.username}</a>
                <p className="d-inline date ps-1">{tweet.created_at}</p>
                <p className="pt-3 fw-light">{tweet.message}</p>
                <button className="btn btn-sm d-flex ms-auto delete-btn" data-id={tweet.id} onClick={deleteTweetHandler}> Delete </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <UserPage />,
    document.body.appendChild(document.createElement('div'))
  );
});
