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
import './issuestructure.css'

const styles = theme => ({
  card: {
    maxWidth: '90%',
    margin: 'auto',
    marginTop: 30
  }
//   media: {
//     height: 0,
//     paddingTop: '56.25%', // 16:9
//   },
//   actions: {
//     display: 'flex',
//   },
//   expand: {
//     transform: 'rotate(0deg)',
//     transition: theme.transitions.create('transform', {
//       duration: theme.transitions.duration.shortest,
//     }),
//     marginLeft: 'auto',
//     [theme.breakpoints.up('sm')]: {
//       marginRight: -8,
//     },
//   },
//   avatar: {
//     backgroundColor: red[500],
//   },
});

const IssueComment = (props) => {
    const { classes } = props;
    const date = new Date(Date.parse(props.created_at));
    return (
      <Card className={classes.card}>
        <CardHeader className="commentheader"
          avatar={<img className="githubavatar" src={props.avatar_url} />}
        //   action={
        //     <IconButton>
        //       <MoreVertIcon />
        //     </IconButton>
        //   }
        // <a href={props.html_url}>{props.username}</a>
          title={`${props.username} commented on ${date.toDateString()} at ${date.toLocaleTimeString()}`}
        //   subheader={props.created_at}
        />
        <CardContent className="commentbody">
          <Typography component="p">
            {props.body}
          </Typography>
        </CardContent>
      </Card>
    );
}

// RecipeReviewCard.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(IssueComment);