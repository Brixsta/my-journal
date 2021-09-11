import React from 'react';

class JournalPostsContainer extends React.Component {
    constructor (props) {
        super(props);


        this.handleChange = this.handleChange.bind(this);
    }

handleChange (evt) {
    evt.preventDefault();
    this.props.updateTextAreaContent(evt.target.value);
}

    render () {
        return (
            <div className="journal-posts-container">
                <form className="journal-posts-form">
                    <textarea 
                    value={this.props.textAreaContent}
                    onChange={this.handleChange}
                    className="journal-text-area">
                    </textarea>
                </form>
                <div 
                style={{display: this.props.postDeleted ? 'block' : 'none'}}
                className="post-deleted">
                    <span className={this.props.postDeleted ? "deleted-message" : ''}>
                    Post  was successfully deleted.
                    </span>
                </div>    
                <div 
                style={{display: this.props.postSaving ? 'block' : 'none'}}
                className="post-saved">
                    <span className={this.props.postSaving ? "saving-message" : ''}>
                    Saving...
                    </span>
                </div>
                <div 
                style={{display: this.props.postAdded ? 'block' : 'none'}}
                className="post-added">
                    <span className={this.props.postAdded ? "adding-message" : ''}>
                    New post has been added.
                    </span>
                </div>
            </div>
        )
    }
}

export default JournalPostsContainer;