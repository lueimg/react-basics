import React, { Component } from 'react';
import { Link } from 'react-router';
import api from '../../api.js';
import Post from '../../posts/containers/Post.jsx';
import Loading from '../../shared/components/Loading.jsx';
import Header from '../../shared/components/Header.jsx';

import { connect } from 'react-redux';
import actions from '../../actions';

import { bindActionCreators } from 'redux';

class Home extends Component {
    constructor (props) {
        super(props)

        this.state = {
            loading: true
        };

        this.handleScroll = this.handleScroll.bind(this);
    }

    async componentDidMount() {
        await this.props.actions.postNextPage();
        this.setState({ loading: false })
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount () {
        window.removeEventListener('scroll', this.handleScroll);
    }


    handleScroll(event) {
    if(this.state.loading) return null;

    const scrolled = window.scrollY;
    const viewportHeight = window.innerHeight;
    const fullHeight = document.body.clientHeight;

    if(!(scrolled + viewportHeight + 300 >= fullHeight)) {
      return null
    }

    this.setState({loading: true}, async () => {
      try {
        await this.props.actions.postNextPage();
        this.setState({ loading: false})
      } catch (error){
        console.error(error);
        this.setState({loading: false});
      }
    })
  }

    render() {

        return (
           
            <section name="Home">
                <Header/>
                <h1>Home</h1>
                <section>
                    {this.props.posts.map(post => <Post key={post.get('id')} {...post.toJS()} />).toArray()}
                     {this.props.loading && (<Loading />)}
                </section>
            
             </section>
        );
    } 
}

// state from redux
const mapStateToProps = (state) => {
    return {
        posts: state.get('posts').get('entities'),
        page: state.get('posts').get('page')
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);