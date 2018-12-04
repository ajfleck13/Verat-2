import React, { Component } from 'react';
import axios from 'axios'
import IssueLoader from './CardView/Loader'
import ReleaseView from './CardView/ReleaseView'
import Draggable from 'react-draggable';
import IssueWindow from './IssueWindow/IssueWindow'
import SearchFilter from './CardView/SearchFilter'
import Minimap from './Minimap'

let baseURL = 'https://api.github.com'

export default class Master extends Component {
    state = {
        issueArray: {},
        isDragging: false,
        AllReleases: [],
        ActiveLabels: [],
        AllLabels: [],
        username: 'ajfleck13',
        repo: 'Project-Verat',
        ViewingIssue: false
    }

    componentDidMount() {
        this.getMorePosts();
        this.getAllLabels();
    }

    getMorePosts() {        
        let urlRepo = baseURL + `/repos/${this.state.username}/${this.state.repo}/issues`;
        
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

    getAllLabels() {
        axios.get(baseURL + `/repos/${this.state.username}/${this.state.repo}/labels`)
        .then((response) => {
            let data = response.data
            console.log(data);
            let labelArray = [];
            for (let i = 0; i < data.length; i++) {
                let labels = {
                    name: data[i].name,
                    description: data[i].description,
                    color: data[i].color,
                    id: data[i].id,
                };
                labelArray.push(labels);
            }
            this.setState({AllLabels: labelArray});
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
        console.log(src)
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
            this.setState({isDragging: false});
            return;
        }

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
        this.removeIssueFromRelease(issueNumber, oldReleaseIndex);
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
        newarray.splice(newarray.indexOf(issueNumber), 1);
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

    handleChange = event => {
        console.log(this);
        let labelsarray = this.state.ActiveLabels.slice();
        this.addOrRemove(labelsarray, event.target.value)
        this.setState({ ActiveLabels: labelsarray });
    };

    addOrRemove(array, value) {
        var index = array.indexOf(value);
    
        if (index === -1) {
            array.push(value);
        } else {
            array.splice(index, 1);
        }
    }

    startViewingIssue = (issuenumber) => {
        console.log(this);
        this.setState({
            ViewingIssue: parseInt(issuenumber),
            isDragging: false});
    }

    cancelView = () => {
        this.setState({
            ViewingIssue: false,
            isDragging: false});
    }

    render() {
        //console.log(this.state.AllReleases)
        const vardragHandlers = {onStart: this.onStart, onStop: this.onStop, onDrag: this.handleDrag};

        if(this.state.ViewingIssue !== false)
        {
            return(
                <div>
                    <IssueWindow
                    username = {this.state.username}
                    reponame = {this.state.repo}
                    issue = {this.state.issue}
                    cancelView = {this.cancelView} />
                </div>
            )
        }

        return (
            <div>
                <SearchFilter 
                labelsarray = {this.state.ActiveLabels}
                allLabels = {this.state.AllLabels}
                handleChange={this.handleChange} />
                {/* <Minimap></Minimap> */}
                <div className="issueloader">
                    <IssueLoader 
                    cards={this.state.issueArray} 
                    isDragging={this.state.isDragging} 
                    dragHandlers={vardragHandlers}
                    allReleases = {this.state.AllReleases}
                    viewIssue={this.startViewingIssue} />
                </div>
                <div className="allholder">
                    <ReleaseView 
                    cards={this.state.issueArray} 
                    isDragging={this.state.isDragging} 
                    dragHandlers={vardragHandlers} 
                    allReleases={this.state.AllReleases}
                    viewIssue={this.startViewingIssue} />
                </div>
            </div>
        )
    }
}