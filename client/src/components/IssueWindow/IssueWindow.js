import React, { Component } from 'react';
import axios from 'axios'
import IssueComment from './IssueComment';
import Button from '@material-ui/core/Button';
import './issuestructure.css'

const baseURL = "https://api.github.com"

export default class IssueWindow extends Component {
    state = {
        loadedTitle: false,
        titleComment: null,
        loadedComments: false,
        issueComments: []
    }

    componentDidMount() {
        // const username = this.props.username;
        // const reponame = this.props.reponame;
        // const issueNumber = this.props.issueNumber;
        const username = this.props.username || 'ajfleck13'
        const reponame = this.props.reponame || 'Project-Verat'
        const issueNumber = this.props.issue || 36

        axios.get(baseURL + `/repos/${username}/${reponame}/issues/${issueNumber}`)
        .then((response) => {
            let data = response.data
            this.setState({
                titleComment: data,
                loadedTitle: true
            })
        });
    
        axios.get(baseURL + `/repos/${username}/${reponame}/issues/${issueNumber}/comments`)
        .then((response) => {
            let data = response.data
            let newcommentsarray = this.state.issueComments.slice();
            newcommentsarray.concat(data)
            this.setState({
                issueComments: data,
                loadedComments: true
            })
        });
    }

    render() {
        console.log(this.state.loadedTitle)
        return(
            <div>
                <Button color="primary" onClick={this.props.cancelView}>
                    Go Back
                </Button>
                {this.state.loadedTitle? 
                <div>
                    <h2>{`${this.state.titleComment.title} #${this.state.titleComment.number}`}</h2>
                    <h4>Status: {this.state.titleComment.state}</h4>
                    <IssueComment 
                    username = {this.state.titleComment.user.login}
                    avatar_url = {this.state.titleComment.user.avatar_url}
                    html_url = {this.state.titleComment.user.html_url}
                    created_at = {this.state.titleComment.created_at}
                    body = {this.state.titleComment.body} />
                </div>
                : null
                }

                {
                    this.state.issueComments.map((comment, index) => {
                        return (
                        <IssueComment 
                        key={`comment${index}`}
                        username = {comment.user.login}
                        avatar_url = {comment.user.avatar_url}
                        html_url = {comment.user.html_url}
                        created_at = {comment.created_at}
                        body = {comment.body}
                        />
                    )})
                }
            </div>
        )
    }
}