import React, { Component } from 'react';

class Post extends Component {
    render() {
        return (
            <div>
                <h2>{this.props.headline}</h2>     
            </div>
        );
    }
}

export default Post;        