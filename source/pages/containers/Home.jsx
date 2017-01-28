import React, { Component } from 'react';
import { Link } from 'react-router';

class Home extends Component {
    render() {
        return (
            <section name="Home">
            <h1>Home</h1>
            <Link to="/post"> Go to post</Link>
            <Link to="/profile"> Go to profile</Link>
             </section>
        );
    } 
}

export default Home;