import React, { Component } from 'react';
import { Link } from 'react-router';

class About extends Component {
    render() {
        return (
            <section name="About">
                <h1>About</h1>
                <Link to="/"> Go to Home</Link>
                <Link to="/random"> otro lado</Link>
            </section>
        );
    } 
}

export default About;