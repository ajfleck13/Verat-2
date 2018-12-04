import React from 'react';
import Minimap from 'react-minimap';
import 'react-minimap/dist/react-minimap.css';
import './CardView/structure.css'

const MinimapComp = (props) => {
    return(
        <div style={{height: "200px"}}>
            <Minimap
            className = "minimapclass"
            keepAspectRatio = {true}
            selector = ".minimap"
            height = {200}>
            </Minimap>
        </div>
    )
}


export default MinimapComp;