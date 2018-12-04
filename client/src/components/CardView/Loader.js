import React from 'react';
import IssueCard from './Card';
import Draggable from 'react-draggable';
import './structure.css';

const IssueLoader = (props) => {
    return (
        <div 
        className={`loader` + props.isDragging? "cardlocater" : null}
        data-releaseindex={-1}>
            {
                Object.keys(props.cards).map((issuenumber, index) => (
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

export default IssueLoader

// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import GridList from '@material-ui/core/GridList';
// import GridListTile from '@material-ui/core/GridListTile';
// import GridListTileBar from '@material-ui/core/GridListTileBar';
// import IconButton from '@material-ui/core/IconButton';
// import StarBorderIcon from '@material-ui/icons/StarBorder';

// const styles = theme => ({
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//     overflow: 'hidden',
//     backgroundColor: theme.palette.background.paper,
//   },
//   gridList: {
//     flexWrap: 'nowrap',
//     // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
//     transform: 'translateZ(0)',
//   },
//   title: {
//     color: theme.palette.primary.light,
//   },
//   titleBar: {
//     background:
//       'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
//   },
// });

// function SingleLineGridList(props) {
//   const { classes } = props;

//   return (
//     <div className={classes.root}>
//       <GridList className={classes.gridList} cols={2.5}>
//         {tileData.map(tile => (
//           <GridListTile key={tile.img}>
//             <img src={tile.img} alt={tile.title} />
//             <GridListTileBar
//               title={tile.title}
//               classes={{
//                 root: classes.titleBar,
//                 title: classes.title,
//               }}
//               actionIcon={
//                 <IconButton>
//                   <StarBorderIcon className={classes.title} />
//                 </IconButton>
//               }
//             />
//           </GridListTile>
//         ))}
//       </GridList>
//     </div>
//   );
// }

// SingleLineGridList.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(SingleLineGridList);