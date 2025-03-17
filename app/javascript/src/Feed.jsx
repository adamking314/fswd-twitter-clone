import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { getTweets, postTweet, deleteTweet } from '/app/javascript/packs/request.js';
import Layout from './layout';
import { getCurrentUser, countUsersTweets } from '/app/javascript/packs/utils';
import { safeCredentials, handleErrors } from '@src/utils/fetchHelper';

import './feed.scss';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      newTweet: "",
      errorMessage: "",
      currentUser: "",
      characters: 140,
      tweetCount: 0
    };
  }

  componentDidMount() {
    getCurrentUser(response => {
      this.setState({ currentUser: response.username });
      countUsersTweets(response.username, tweetCount => {
        this.setState({ tweetCount });
      });
    });
    getTweets(this.listOfTweets);
  }

  listOfTweets = (response) => {
    this.setState({ tweets: response.tweets });
  };

  postTweetHandler = (event) => {
    event.preventDefault();
    const { newTweet } = this.state;
    postTweet(newTweet, (response) => {
      if (!response.success) {
        this.setState({ errorMessage: "Sorry, there was an error posting your tweet. Please try again" });
      } else {
        this.setState({ errorMessage: "", newTweet: "", characters: 140 });
        getTweets(this.listOfTweets);
        countUsersTweets(response.tweet.username, tweetCount => {
          this.setState({ tweetCount });
        });
      }
    });
  };

  tweetInputHandler = (event) => {
    this.setState({
      newTweet: event.target.value,
      characters: 140 - event.target.value.length
    });
  };

  deleteTweetHandler = (event) => {
    const id = event.target.dataset.id;
    deleteTweet(id, () => {
      getTweets(this.listOfTweets);
      countUsersTweets(this.state.currentUser, tweetCount => {
        this.setState({ tweetCount });
      });
    });
  };

  render() {
    const { tweets, newTweet, errorMessage, currentUser, characters, tweetCount } = this.state;
    return (
      <React.Fragment>
        <Layout>
          <h1>Twitter Clone Feed</h1>
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
                <form onSubmit={this.postTweetHandler}>
                  <textarea
                    className="form-control tweet-box"
                    id="tweetInput"
                    value={newTweet}
                    onChange={this.tweetInputHandler}
                    placeholder="What's happening?"
                    maxLength="140"
                  ></textarea>
                  <button
                    type="submit"
                    className="btn btn-sm tweet-btn"
                    disabled={characters === 140 || characters < 0}
                  >
                    Tweet
                  </button>
                </form>
                <p>{errorMessage}</p>
              </div>
            </div>
            <div className='row'>
              <div className='col-12 twitter-feed'>
                {tweets.map(tweet => (
                  <div className="tweet p-3 pb-0" key={tweet.id}>
                    <p className="fw-bold d-inline">{tweet.username}</p>
                    <a href={`/${tweet.username}`} className="fw-light ps-1">@{tweet.username}</a>
                    <p className="d-inline date ps-1">{tweet.created_at}</p>
                    <p className="pt-3 fw-light">{tweet.message}</p>
                    {tweet.username === currentUser && (
                      <button className="btn btn-sm d-flex ms-auto delete-btn" data-id={tweet.id} onClick={this.deleteTweetHandler}>Delete</button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Layout>
      </React.Fragment>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Feed />,
    document.body.appendChild(document.createElement('div'))
  );
});
