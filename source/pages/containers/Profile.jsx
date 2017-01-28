import React, { Component } from 'react';
import { Link } from 'react-router';

class Profile extends Component {
    render() {
        return (
            <section name="Profile">
                <h1>Profile</h1>
                <Link to="/"> Go to Home</Link>
                <Link to="/random"> otro lado</Link>
            </section>
        );
    } 
}

export default Profile;