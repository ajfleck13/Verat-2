import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import './issuestructure.css'

const styles = theme => ({
    card: {
      maxWidth: '90%',
      margin: 'auto',
      marginTop: 30
    }
});

const IssuePost = (props) => {
    const { classes } = props;

    return(
        <Card className={classes.card}>
            <CardHeader className="commentheader"
            avatar={<img className="githubavatar" src={props.avatar_url} />}
            title={`Post new comment`}
            />
            <CardContent className="commentbody">
            <Input style={{width: "100%", height: "100px", padding: "3px"}}
            multiline={true} 
            placeholder="Post new comment" />
            </CardContent>
        </Card>
    )
}

export default withStyles(styles)(IssuePost);