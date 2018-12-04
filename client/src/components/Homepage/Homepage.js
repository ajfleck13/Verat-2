import React, { Component } from 'react';
import axios from 'axios'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Master from '../Master'



export default class HomePage extends Component {
    state = {
        username: "",
        loadedSaves: false,
        saves: null,
        creatingNewSave: null,
        usingVerat: false
    }

    handleChange = (field, event) => {
        let object = {}
        object[field] = event.target.value
        this.setState(object);
    }

    getUser = () => {
        if(this.state.username && this.state.username.length > 5)
        {
            axios.get(`/api/mysaves/${this.state.username}`)
            .then((response) => {
                console.log(response);
                this.setState({
                    loadedSaves: true,
                    saves: response
                })
            }).catch((response) => {
                this.setState({
                    loadedSaves: true
                })
            })
        }
    }

    loadSave = (value) => {
        this.setState({
            creatingNewSave: value
        })
    }

    loadProject = () => {
        this.setState({
            usingVerat: true
        })
    }
    

    render() {
        if(this.state.usingVerat)
        {
            return (
                <Master 
                username={this.state.user}
                repository={this.state.repo}
                />
            )
        }
        return(
            <div style={{marginTop: "30%"}}>
                {
                    !this.state.loadedSaves? 
                    <div>
                        <h1>Project Verat</h1>
                        <p>Please specify your login below</p>
                        
                        <InputLabel htmlFor="select-multiple">Username:  </InputLabel>
        
                        <Input onChange={(event) => (this.handleChange("username", event))} name="username" value={this.state.username} placeholder="" />
                        <br /><br />
        
                        <Button onClick={this.getUser} variant="outlined">
                            Login
                        </Button>
                    </div>
                    :
                    this.state.creatingNewSave === null ?
                    <div>
                        <h1>Load Save From Prior Saves</h1>

                        <h4>Save #1</h4>
                        <Button onClick={() => this.loadSave(0)} variant="outlined">
                            Create New Save
                        </Button>
                        <br /><br />
                        <h4>Save #2</h4>
                        <Button onClick={() => this.loadSave(1)} variant="outlined">
                            Create New Save
                        </Button>
                        <br /><br />
                        <h4>Save #3</h4>
                        <Button onClick={() => this.loadSave(2)} variant="outlined">
                            Create New Save
                        </Button>                        
                    </div>
                    :
                    <div>
                        <h1>Insert Repository To Organize</h1>

                        <br /><br />
                        <InputLabel>Repository User:  </InputLabel>
                        <Input onChange={(event) => (this.handleChange("user", event))} name="user" value={this.state.user} placeholder="" />
                        <br /><br />
                        <InputLabel>Repository Name:  </InputLabel>
                        <Input onChange={(event) => (this.handleChange("repo", event))} name="repo" value={this.state.repo} placeholder="" />
                        <br /><br />
                        <Button onClick={this.loadProject} variant="outlined">
                            Begin Project
                        </Button>
                    </div>
                }
            </div>
        )
    }
}