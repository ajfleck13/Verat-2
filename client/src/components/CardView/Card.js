import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


let githubcolorOpen = "#2cbe4e";
let githubcolorClosed = "#cb2431";

const styles = {
    card: {
      maxWidth: 345,
      maxHeight: 300,
      display: 'inline-block'
    },
    media: {
      height: 140,
    },
};
  
const IssueCard = (props) => {
    const { classes } = props;

    return( 
        <Card className={`${classes.card} issuecard ${props.isDragging? "draggingCardsPreventEvents" : ""}`}
        onMouseDown = {(e) => (props.onMouseDown(e, this))}
        onMouseUp = {(e) => (props.onMouseUp(e, this))}
        onTouchStart = {(e) => (props.onTouchStart(e, this))}
        onTouchEnd = {(e) => (props.onTouchEnd(e, this))}
        id={"issue" + props.issue.number}
        data-issue={props.issue.number}
        style={props.style}>
            <CardActionArea>
                <div className="issuecardheader"
                onMouseDown={() => {props.viewIssue(props.issue.number)}}>
                    <CardHeader 
                    style = {{padding: "4px", fontSize: "20px", maxHeight: "90px", overflow: "hidden"}}
                    title = {`#${props.issue.number} ${props.issue.title}`}
                    />
                </div>
                <CardContent style={{overflow: "hidden", maxHeight: "100px", padding: "8px"}}>
                <Typography
                component="p">
                    {props.issue.body}
                </Typography>
                {/* <Typography gutterBottom variant="h5" component="h2">
                    #{props.issue.number}
                </Typography> */}
                </CardContent>
            </CardActionArea>
            {/* <CardActions>
                <Button size="small" color="primary">
                Share
                </Button>
                <Button size="small" color="primary">
                Learn More
                </Button>
            </CardActions> */}

        </Card>
    )
}

// const Card = (props) => {
//     return (
//     <div className={"card issuecard"} id={"issue" + props.issue.number}>
//         <p className={"card-header"} style={{backgroundcolor: (props.issue.state === "open"? githubcolorOpen : githubcolorClosed)}}>{props.issue.title}</p>
//         <p className={"card-body"}>{props.issue.body}</p>
//         <p className={"card-footer"}>{props.issue.number}</p>
//     </div>
//     )
// }

export default withStyles(styles)(IssueCard);