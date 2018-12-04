import React, { Component } from 'react';
import Release from './Release'
import './structure.css';


export default class ReleaseView extends Component {
    render() {
        return (
            <div className="releaseholder">
                <div className="releaseview">
                    {
                        this.props.allReleases.map((release, index) => (
                            <Release 
                            key={`release${index}`} 
                            isDragging = {this.props.isDragging}
                            cards={this.props.cards} 
                            issues={release} 
                            dragHandlers={this.props.dragHandlers}
                            releaseindex={index}/>
                        ))
                    }
                    <div className={`newrelease ${this.props.isDragging? "cardlocater" : ""}`} data-releaseindex={this.props.allReleases.length}></div>
                </div>
            </div>
        )
    }
}