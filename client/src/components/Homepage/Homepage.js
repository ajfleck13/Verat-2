import React, { Component } from 'react';
import axios from 'axios'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Master from '../Master'



export default class HomePage extends Component {
    state = {
        //API loading info
        username: "",
        saves: null,

        //UI state directors
        loadedSaves: false,
        creatingNewSave: false,
        usingVerat: false,

        //Project starting variables
        usingVerat: false,
        saveNumber: null,
        saveToLoad: null,
        user: "",
        repo: "",
    }

    //Authorize app with github to get user identity
    componentDidMount() {
        // axios.get('https://github.com/login/oauth/authorize')
        // .then((response) => {
        //     let data = response.data;
        //     this.setState({
        //         username: data.client_id
        //     })
        //     this.getUser()
        // })
    }


    handleChange = (field, event) => {
        let object = {}
        object[field] = event.target.value
        this.setState(object);
    }

    getUser = () => {
        if(this.state.username && this.state.username.length > 5)
        {
            this.setState({
                loadedSaves: true,
                saves: null
            })
            // axios.get(`/api/mysaves/${this.state.username}`)
            // .then((response) => {
            //     console.log(response);
            //     this.setState({
            //         loadedSaves: true,
            //         saves: response
            //     })
            // }).catch((response) => {
            //     this.setState({
            //         loadedSaves: true
            //     })
            // })
        }
    }

    loadSave = (value) => {
        if(this.saveExists(value))
        {
            this.setState({
                usingVerat: true,
                saveToLoad: this.saveExists(value),
                saveNumber: value
            })
        }
        else
        {
            this.setState({
                creatingNewSave: true,
                saveNumber: value
            })
        }
    }

    startNewProject = () => {
        this.setState({
            usingVerat: true,
        })
    }

    saveExists = (index) => {
        if(this.state.saves === null)
        {
            return null;
        }

        this.state.saves.forEach(save => {
            if(parseInt(save.saveNumber) === index)
            {
                return save;
            }
        });

        return null;
    }
    
    saveString = (index) => {
        let save = this.saveExists(index);
        if(save === null)
        {
            return "Create New Save";
        }
        else
        {
            return `Save from : ${save.repousername} / ${save.reponame}`;
        }
    }

    render() {
        if(this.state.usingVerat)
        {
            return (
                <Master 
                saveNumber = {this.state.saveNumber}
                saveToLoad = {this.state.saveToLoad}
                username={this.state.user}
                repository={this.state.repo}
                />
            )
        }
        return(
            <div style={{marginTop: "20%"}}>
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
                    !this.state.creatingNewSave ?
                    <div>
                        <h1>Load Save From Prior Saves</h1>

                        <h4>Save #1</h4>
                        <Button onClick={() => this.loadSave(0)} variant="outlined">
                            {
                                this.saveString(0)
                            }
                        </Button>
                        <br /><br />
                        <h4>Save #2</h4>
                        <Button onClick={() => this.loadSave(1)} variant="outlined">
                            {
                                this.saveString(1)
                            }
                        </Button>
                        <br /><br />
                        <h4>Save #3</h4>
                        <Button onClick={() => this.loadSave(2)} variant="outlined">
                            {
                                this.saveString(2)
                            }
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
                        <Button onClick={this.startNewProject} variant="outlined">
                            Begin Project
                        </Button>
                    </div>
                }
            </div>
        )
    }
}