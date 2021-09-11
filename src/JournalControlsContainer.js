import React from 'react';

class JournalControlsContainer extends React.Component {

    constructor () {
        super();

        this.addNewPost = this.addNewPost.bind(this);
        this.saveChangesToPost = this.saveChangesToPost.bind(this);
    }

    addNewPost () {
        this.props.addNewPost();
    }

     saveChangesToPost () {
        this.props.saveChangesToPost();
    }

    render () {
        return (
            <div className='journal-controls-container'>
                <button 
                className="add-new-button"
                onClick={this.addNewPost}>Add New</button>
                <button 
                disabled={this.props.saveDisabled ? true : false}
                className="save-changes-button"
                onClick={this.saveChangesToPost}>Save</button>
            </div>
        )
    }
}

export default JournalControlsContainer;