import React from 'react';
import IssueCard from './Card'
import Draggable from 'react-draggable';


const Release = (props) => {
    return (
        <div 
        className={`release ${props.isDragging? "cardlocater" : ""}`}
        data-releaseindex = {props.releaseindex}>
        <h2>Release {props.releaseindex + 1}</h2>
            {
            props.issues.map((issuenumber) => (
                <Draggable 
                    position={{x: 0, y: 0}} //reset position if not dragging
                    cancel="issuecardheader"
                    {...props.dragHandlers} //pass down drag handling props
                    key={`draggable${issuenumber}`}
                    >
                    <IssueCard 
                    issue={props.cards[issuenumber]}
                    isDragging={props.isDragging}
                    viewIssue={props.viewIssue} />
                </Draggable>
            ))
            }
        </div>
    )
}

export default Release;