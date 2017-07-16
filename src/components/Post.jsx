import React, { Component } from 'react';

class Post extends Component {
        constructor(props) {
        super(props)
        this.state = { active: false }
    }

    render() {
        return (
            <div 
                className={'Posts__single' + (this.state.active ? ' active': '')} 
                onClick={()=>{this.setState({active: true})}}>
                

                <h2>{this.props.headline}</h2>
                <img src={this.props.image.url} alt={this.props.image.alt} />
                <p class="intro">{this.props.intro}</p>
                {(this.state.active ? 
                <div >
                    {this.props.body}
                </div>
                :'')}
            </div>
        );
    }
}

export default Post;        