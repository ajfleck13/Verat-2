import React, { Component } from 'react';
import axios from 'axios'
import IssueLoader from './CardView/Loader'
import ReleaseView from './CardView/ReleaseView'
import Draggable from 'react-draggable';
import IssueWindow from './IssueWindow/IssueWindow'
import SearchFilter from './CardView/SearchFilter'

export default class Master extends Component {
    state = {
        issueArray: {},
        isDragging: false,
        AllReleases: []
    }

    componentDidMount() {
        this.getMorePosts();
    }

    getMorePosts() {
        //let inputArray = repositorytext.split("/");
        //username = inputArray[0];
        //repo = inputArray[1];
        let username = 'ajfleck13'
        let repo = 'Project-Verat'
        let baseURL = 'https://api.github.com'
        
        let urlRepo = baseURL + `/repos/${username}/${repo}/issues`;
        
        axios.get(urlRepo, {
            params: {
                "state": "all",
                'per_page': 100,
            }
        })
        .then((response) => {
            let data = response.data;
            //console.log(data);
            for (let i = 0; i < data.length; i++) {
                if (data[i].pull_request) {
                    continue;
                }
                let issueslabelArray = [];
                for (let a = 0; a < data[i].labels.length; a++) {
                    issueslabelArray.push(`${data[i].labels[a].id}`);
                }
                let issue = {
                    title: data[i].title,
                    body: data[i].body,
                    number: data[i].number,
                    login: data[i].user.login,
                    avatar: data[i].user.avatar_url,
                    html: data[i].user.html_url,
                    labels: issueslabelArray,
                    state: data[i].state,
                };
                this.state.issueArray[`${issue.number}`] = issue;
            }
            this.setState({
                issueArray: this.state.issueArray
            })
        })
    }

    // getInitialState() {
    //     return {
    //       activeDrags: 0,
    //       deltaPosition: {
    //         x: 0, y: 0
    //       },
    //       controlledPosition: {
    //         x: -400, y: 200
    //       }
    //     };
    //   }
    
    // handleDrag = (e, ui) => {
    //     const {x, y} = this.state.deltaPosition;
    //     this.setState({
    //         deltaPosition: {
    //         x: x + ui.deltaX,
    //         y: y + ui.deltaY,
    //         }
    //     });
    // }

    onStart = (e) => {
        this.setState({isDragging: true});
    }

    onStop = (e, src) => {
        //console.log(e);
        console.log(src)
        //const card = src.closest(".issuecard"); 
        //console.log(card);
        const oldrelease = src.node.closest(".cardlocater");
        const newrelease = document.querySelector('.cardlocater:hover'); //Finds the element we were hovering the draggable component over when we dropped it
        console.log(oldrelease);
        console.log(newrelease);

        if(!oldrelease || !newrelease)
        {
            this.setState({isDragging: false});
            return;
        }

        const oldreleaseindex = oldrelease.getAttribute('data-releaseindex');
        const newreleaseindex = newrelease.getAttribute('data-releaseindex');

        if(oldreleaseindex === newreleaseindex)
        {
            return;
        }

        //const card = e.srcElement.closest(".issuecard"); //Finds the issue card which represents the dragged element
        const issue = src.node.getAttribute('data-issue'); //Reads the issue card for the issue attribute which has the stored issue
        console.log(issue)

        this.setState({isDragging: false});
        this.tryMoveIssue(parseInt(issue), parseInt(oldreleaseindex), parseInt(newreleaseindex));
    }

    tryMoveIssue(issueNumber, oldReleaseIndex, newReleaseIndex)
    {
        //Expand the releases if we have to
        if(newReleaseIndex === this.state.AllReleases.length)
        {
            this.increaseReleases();
        }

        console.log(this.state);
        //If we aren't just stealing a loader array element
        //this.removeIssueFromRelease(issueNumber, oldReleaseIndex);
        console.log(this.state)
        this.addIssueToRelease(issueNumber, newReleaseIndex);
        console.log(this.state)

    }

    increaseReleases() {
        let newarray = this.state.AllReleases.slice();
        newarray.push([]);
        this.setState({AllReleases: newarray})
    }

    removeIssueFromRelease(issueNumber, oldReleaseIndex) {
        if(oldReleaseIndex === -1)
        {
            return;
        }

        let newarray = this.state.AllReleases[oldReleaseIndex].slice();
        newarray.splice(newarray[oldReleaseIndex].indexOf(issueNumber), 1);
        let newallreleases = this.state.AllReleases.slice();
        newallreleases[oldReleaseIndex] = newarray
        this.setState({AllReleases: newallreleases});
    }

    addIssueToRelease(issueNumber, newReleaseIndex)
    {
        if(newReleaseIndex === -1)
        {
            return;
        }

        let newallreleases = this.state.AllReleases.slice();
        newallreleases[newReleaseIndex].push(issueNumber);
        this.setState({AllReleases: newallreleases});
    }

    // // For controlled component
    // adjustXPos = (e) => {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     const {x, y} = this.state.controlledPosition;
    //     this.setState({controlledPosition: {x: x - 10, y}});
    // }

    // adjustYPos = (e) => {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     const {controlledPosition} = this.state;
    //     const {x, y} = controlledPosition;
    //     this.setState({controlledPosition: {x, y: y - 10}});
    // }

    // onControlledDrag = (e, position) => {
    //     const {x, y} = position;
    //     this.setState({controlledPosition: {x, y}});
    // }

    // onControlledDragStop = (e, position) => {
    //     this.onControlledDrag(e, position);
    //     this.onStop();
    // }
    

    render() {
        console.log(this.state.AllReleases)
        const vardragHandlers = {onStart: this.onStart, onStop: this.onStop, onDrag: this.handleDrag};
        return (
            <div>
                <SearchFilter />
                <div className="issueloader">
                    <IssueLoader 
                    cards={this.state.issueArray} 
                    isDragging={this.state.isDragging} 
                    dragHandlers={vardragHandlers}
                    allReleases = {this.state.AllReleases} />
                </div>
                <div className="allholder">
                    <ReleaseView 
                    cards={this.state.issueArray} 
                    isDragging={this.state.isDragging} 
                    dragHandlers={vardragHandlers} 
                    allReleases={this.state.AllReleases} />
                </div>
                {/* <IssueWindow /> */}
            </div>
        )
    }
}