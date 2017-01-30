import React, {Component, PropTypes} from 'react';
import {Link  } from 'react-router';

import api from '../../api.js'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../../actions';

class Post extends Component {
    constructor (props) {
        super(props)
        
        this.state = {
            loading: true,
        }
    }

    async componentDidMount() {
        if (this.props.user && this.props.comments.size > 0) return this.setState({loading:false});

        await Promise.all([
            this.props.actions.loadUser(this.props.userId),
            this.props.actions.loadCommentForPost(this.props.id)
        ]);

        this.setState({loading: false})
    }
    
    render() {
        return (
            <article id={`post-${this.props.id}`}>
            <Link to={`/post/${this.props.id}`}>
                 <h2>{this.props.title}</h2>
            </Link>
               
                <p>{this.props.body}</p>
                {!this.state.loading && ( 
                    <div>
                    <Link to={`/user/${this.props.user.id}`}>{this.props.user.name}</Link>
                        <a href={`${this.props.user.get('website')}`} target="_blank"> {this.props.user.name}</a>
                        <span>
                            Hay {this.props.comments.size} comentarios
                        </span>

                        

                    </div>)}
            </article>
        );
    }
}

Post.propTypes = {
    id: PropTypes.number,
    userId: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
};
// state del store
// props de componente
const mapStateToProps = (state, props) => {
    return {
        comments: state.get('comments').filter(comment => comment.get('postId') === props.id),
        user: state.get('users').get(props.userId)
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);