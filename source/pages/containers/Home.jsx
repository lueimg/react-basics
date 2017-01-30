import React, { Component } from 'react';
import { Link } from 'react-router';
import api from '../../api.js';
import Post from '../../posts/containers/Post.jsx';
import Loading from '../../shared/components/Loading.jsx';
import Header from '../../shared/components/Header.jsx';

import { connect } from 'react-redux';
import actions from '../../actions';


class Home extends Component {
    constructor (props) {
        super(props)

        this.state = {
            loading: true
        };

        this.handleScroll = this.handleScroll.bind(this);
    }

    async componentDidMount() {
        const posts = await api.posts.getList(this.props.page);

        this.props.dispatch(actions.setPost(posts));

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
        const posts = await api.posts.getList(this.props.page);
        this.props.dispatch(actions.setPost(posts));
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
                    {this.props.posts.map(post => <Post key={post.id} {...post} />)}
                     {this.props.loading && (<Loading />)}
                </section>
            
             </section>
        );
    } 
}

// state from redux
const mapStateToProps = (state) => {
    return {
        posts: state.posts.entities,
        page: state.posts.page
    }
}

// const mapDispatchToProps = (dispatch, ownProps) => {
//     return {
//         dispatch: () => {
//             dispatch(actionCreator)
//         }
//     }
// }

export default connect(mapStateToProps)(Home);