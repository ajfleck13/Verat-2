import React from 'react';
import IssueCard from './Card';
import Draggable from 'react-draggable';
import './structure.css';
import GridList from '@material-ui/core/GridList';
import { withStyles } from '@material-ui/core/styles';
import { GridListTile } from '@material-ui/core';


const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    tile: {
        width: "300px",
    },
});


const IssueLoader = (props) => {
    const { classes } = props;

    let filteredcards = filterCards(Object.keys(props.cards), props)

    return (
        <div 
        className={classes.root + `loader` + props.isDragging? "cardlocater" : null}
        data-releaseindex={-1}>
            <GridList className={classes.gridList}>
            {
                filteredcards.map((issuenumber, index) => (
                    <GridListTile 
                    cols={0.4}
                    rows={1.25}
                    key={`loaderdraggable${issuenumber}`}
                    className={classes.tile}
                    component={"div"}
                    >
                        <Draggable 
                            position={{x: 0, y: 0}} //reset position if not dragging
                            cancel="issuecardheader"
                            {...props.dragHandlers} //pass down drag handling props
                            //key={`loaderdraggable${issuenumber}`}
                            >
                            <IssueCard 
                            issue={props.cards[issuenumber]} 
                            isDragging={props.isDragging}
                            viewIssue={props.viewIssue} />
                        </Draggable>
                    </GridListTile>
                ))
            }
            </GridList>
        </div>
    )
}

const filterCards = (cardarray, props) => {
    return cardarray.filter((element, index) => {
        for(let i = 0; i < props.allReleases.length; i++)
        {
            if(props.allReleases[i].includes(parseInt(element)))
            {
                return false;
            }
        }
        return true;
    })
}

export default withStyles(styles)(IssueLoader);

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
//           <GridListTile>
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

// export default withStyles(styles)(SingleLineGridList);