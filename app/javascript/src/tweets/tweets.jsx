// React imports
import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';

const Tweets = () => {
  const [tweets, setTweets] = useState([]);
  const [newTweet, setNewTweet] = useState('');

  // Fetch tweets on component mount
  useEffect(() => {
    fetch('/api/tweets')
      .then(response => response.json())
      .then(data => {
        console.log("Fetched tweets:", data); // Debugging line
        setTweets(Array.isArray(data) ? data : []); // Ensure it's an array
      })
      .catch(error => {
        console.error("There was an error fetching the tweets!", error);
        setTweets([]); // Prevent .map() error
      });
  }, []);

  // Handle posting a tweet
  const getCsrfToken = () => {
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    fetch('/api/tweets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': getCsrfToken(), // Include CSRF token here
      },
      body: JSON.stringify({ tweet: { message: newTweet } }),
      credentials: 'include', // Ensures cookies are sent
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP status ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setTweets([data, ...tweets]);
        setNewTweet('');
      })
      .catch(error => {
        console.error('There was an error posting the tweet!', error);
      });
  };
  

  return (
    <div>
      <h1>Tweets</h1>
      <form onSubmit={handleSubmit}>
        <textarea 
          value={newTweet} 
          onChange={(e) => setNewTweet(e.target.value)} 
          placeholder="What's happening?"
        />
        <button type="submit">Tweet</button>
      </form>

      <ul>
        {tweets.map(tweet => (
          <li key={tweet.id}>
            <p>{tweet.message}</p> {/* Changed from tweet.message to tweet.content */}
            <span>{tweet.created_at}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tweets;

// Ensure #tweets div exists in your HTML
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('tweets');
  if (container) {
    ReactDOM.render(<Tweets />, container);
  } else {
    console.error("Target container #tweets not found.");
  }
});
