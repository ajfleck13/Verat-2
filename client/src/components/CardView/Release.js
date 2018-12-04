import React from 'react';
import IssueCard from './Card'
import Draggable from 'react-draggable';


const Release = (props) => {
    return (
        <div 
        className={`release ${props.isDragging? "cardlocater" : ""}`}
        data-releaseindex = {props.releaseindex}>
            {
            props.issues.map((issuenumber) => (
                <Draggable 
                    position={{x: 0, y: 0}} //reset position if not dragging
                    {...props.dragHandlers} //pass down drag handling props
                    key={`draggable${issuenumber}`}
                    >
                    <IssueCard 
                    issue={props.cards[issuenumber]}
                    isDragging={props.isDragging} />
                </Draggable>
            ))
            }
        </div>
    )
}

export default Release;