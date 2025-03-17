import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'; // If you're using react-router for routing


class CreateTweet extends Component {
  state = {
    authenticated: false,
  };

  componentDidMount() {
    // Check if the user is authenticated when the page loads
    fetch('/api/authenticated')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          authenticated: data.authenticated,
        });
      })
      .catch(() => {
        this.setState({
          authenticated: false,
        });
      });
  }

  render() {
    const { authenticated } = this.state;

    if (!authenticated) {
      // Redirect to login page if the user is not authenticated
      return <Redirect to="/login" />;
    }

    return (
      <div className="create-tweet">
        <h3>Create a new Tweet</h3>
        <form>
          {/* Your tweet form */}
          <textarea placeholder="What's happening?" required></textarea>
          <button type="submit">Post Tweet</button>
        </form>
      </div>
    );
  }
}

export default CreateTweet;
