import React from 'react';
import JournalHeader from './JournalHeader';
import PreviousPostsContainer from './PreviousPostsContainer';
import JournalPostsContainer from './JournalPostsContainer';
import JournalControlsContainer from './JournalControlsContainer';
import axios from 'axios';

class JournalContainer extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            postData: [],
            postDates: [],
            textAreaContent: '',
            currentPostId: null,
            saveDisabled: true,
            postDeleted: false,
            postSaving: false,
            postAdded: false
        }

        this.updateTextAreaContent = this.updateTextAreaContent.bind(this);
        this.getContentByDate = this.getContentByDate.bind(this);
        this.addNewPost = this.addNewPost.bind(this);
        this.saveChangesToPost = this.saveChangesToPost.bind(this);
        this.getPostIdByDate = this.getPostIdByDate.bind(this);
        this.deletePostByDate = this.deletePostByDate.bind(this);
    }

    updateTextAreaContent (value) {
        this.setState({textAreaContent: value});
    }

    async addNewPost () {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        for(let i=0; i<this.state.postDates.length; i++) {
            if(this.state.postDates[i].slice(0,10) === today) {
                alert('Only 1 Journal Post per day');
                return;
            }
        }

        const article = {content: ''}
        await axios.post('http://localhost:9000/api/journal', article);


        this.setState({textAreaContent: '', saveDisabled: false});

        const res = await axios.get('http://localhost:9000/api/journal');
        const newEntry = res.data[res.data.length-1];

        this.setState({postData: [...this.state.postData, newEntry], postDates: [newEntry.postdate.slice(0,10), ...this.state.postDates], currentPostId: newEntry.id, postDeleted: false, postSaving: false, postAdded: true});
        setTimeout(()=>{
            this.setState({postAdded: false})
        },1500)
    }


    async getContentByDate (date) {
        const res = await axios.get('http://localhost:9000/api/journal');
        let content = res.data.filter((item)=>{
            return item.postdate.slice(0,10) === date.slice(0,10);
        });
        this.setState({textAreaContent: content[0].content, saveDisabled: false})
    }

    async deletePostByDate (date) {
        const res = await axios.get('http://localhost:9000/api/journal');
        let postToDelete = res.data.filter(item => item.postdate.slice(0,10) === date.slice(0,10));
        await axios.delete(`http://localhost:9000/api/journal/${postToDelete[0].id}`);
        let newPostDates = this.state.postDates.filter(item => item !== date);
        this.setState({postDates: newPostDates, textAreaContent:'', postDeleted: true, postSaving: false, postAdded: false});
        setTimeout(()=>{
            this.setState({postDeleted: false})
        },1500)
    }

    getPostIdByDate (date) {
        let post = this.state.postData.filter(item => item.postdate.slice(0,10) === date.slice(0,10));
        this.setState({currentPostId: post[0].id});
    }

    async saveChangesToPost () {
        let id = this.state.currentPostId;
        let text = this.state.textAreaContent;
        let article = {content: text};
        await axios.put(`http://localhost:9000/api/journal/${id}`, article);
        const res = await axios.get('http://localhost:9000/api/journal');
        let newText = res.data.filter(item => item.id === id);
        this.setState({textAreaContent: newText[0].content, postSaving: true, postDeleted: false, postAdded: false});
        setTimeout(()=>{
            this.setState({postSaving: false})
        },1500)
    }

    async componentDidMount () {
        const res = await axios.get('http://localhost:9000/api/journal');
        let postDates = [];


        let sortedRes = res.data.sort((a,b)=>{
            return b.id-a.id;
        });

        for(let i=0; i<sortedRes.length; i++) {
            postDates.push(sortedRes[i].postdate.slice(0,10));
        }

        this.setState({postData: res.data, postDates: postDates});
    }

    render () {
        return (
            <div className="journal-container">
                <JournalHeader />
                <PreviousPostsContainer 
                postDates={this.state.postDates}
                getContentByDate={this.getContentByDate}
                getPostIdByDate={this.getPostIdByDate}
                deletePostByDate={this.deletePostByDate}
                />
                <JournalPostsContainer
                textAreaContent={this.state.textAreaContent} 
                updateTextAreaContent={this.updateTextAreaContent} 
                postDeleted={this.state.postDeleted}
                postSaving={this.state.postSaving}
                postAdded={this.state.postAdded}
                />
                <JournalControlsContainer 
                addNewPost={this.addNewPost}
                saveChangesToPost={this.saveChangesToPost}
                textAreaContent={this.state.textAreaContent}
                saveDisabled={this.state.saveDisabled}
                />
            </div>
        )
    }
}

export default JournalContainer;