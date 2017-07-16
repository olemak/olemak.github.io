import React, { Component } from 'react';

class Post extends Component {
    render() {
        return (
            <div>
                <h2>{this.props.headline}</h2>
                <h4>{this.props.intro}</h4>
            </div>
        );
    }
}

export default Post;        