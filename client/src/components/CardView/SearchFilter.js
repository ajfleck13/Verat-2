import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import './structure.css'



const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


export default class SearchFilter extends Component {
    getStyles(name, that) {
        return {
          fontWeight:
            that.props.labelsarray.indexOf(name) === -1
              ? {fontWeight: "bold"}
              : null,
        };
    }


    render() {
        return(
            <div>
                {/* <Button color="primary">
                    Project Verat
                </Button> */}

                <strong style={{marginRight: "50px"}}>Project Verat</strong>
                <InputLabel htmlFor="select-multiple">Filter By Label</InputLabel>
                <Select
                className="filterlabelwidth"
                multiple
                value={this.props.labelsarray}
                onChange={this.props.handleChange}
                input={<Input id="select-multiple" />}
                MenuProps={MenuProps}
                >
                {this.props.allLabels.map(labelobject => (
                    <MenuItem key={labelobject.id} value={labelobject.id} style={this.getStyles(labelobject.id, this)}>
                    {labelobject.name}
                    </MenuItem>
                ))}
                </Select>

                <Input 
                className="searchinput"
                placeholder="Filter Issues" />

                <Button variant="outlined" style={{marginLeft: "50px"}}>
                    Save
                </Button>
            </div>
        )
    }
}

/* <FormControl className={classes.formControl}>
<InputLabel htmlFor="select-multiple">Name</InputLabel>
<Select
  multiple
  value={this.state.name}
  onChange={this.handleChange}
  input={<Input id="select-multiple" />}
  MenuProps={MenuProps}
>
  {names.map(name => (
    <MenuItem key={name} value={name} style={getStyles(name, this)}>
      {name}
    </MenuItem>
  ))}
</Select>
</FormControl> */
