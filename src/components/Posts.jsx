import React, { Component } from 'react';

import {createClient} from 'contentful'

import Post from './Post.jsx'

class Posts extends Component {
    constructor(props) {
        super(props)
        this.state = { posts: false }
    }

    componentWillMount() {
        let client = createClient({
            space: 'y7jhvpcyb2y8',
            accessToken: '7871df3659bf27af877eb2d913229a27dde93785633427d55eecf65c0e534d2c'
        })

        client.getEntries().then(entries=>{this.setState({posts: entries.items})})
    }

    render() {
        return (
            <div>
                <h1>Posts</h1>
                {this.state.posts ? this.state.posts.map((post, i)=><Post 
                    headline={post.fields.title} 
                    intro={post.fields.intro}                     
                    key={"post_" + i} />) 
                    : ''}  
            </div>
        )
    }
}

export default Posts