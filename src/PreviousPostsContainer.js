import React from 'react';
import { v4 as uuidv4 } from 'uuid';

class PreviousPostsContainer extends React.Component {
    constructor (props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleClick (evt) {
        evt.preventDefault();
        this.props.getContentByDate(evt.target.textContent);
        this.props.getPostIdByDate(evt.target.textContent);
    }

    handleSubmit (evt) {
        evt.preventDefault();
        this.props.deletePostByDate(evt.target.textContent.slice(0,evt.target.textContent.length-1));
    }

    render () {
        return (
            <div className="previous-posts-container">
                <ul className="previous-post-list">
                    {this.props.postDates.map((item)=>{
                        return (
                            <form
                            key={uuidv4()}
                            onSubmit={this.handleSubmit}
                            >
                                <li 
                                    onClick={this.handleClick}
                                    className="previous-post-item-title">
                                        {item}
                                </li>
                                <button 
                                className="delete-x">
                                    X
                                </button>
                            </form>  
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default PreviousPostsContainer;