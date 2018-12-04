import React, { Component } from 'react';
import axios from 'axios'
import Master from './Master'

export default class HomePage extends Component {
    componentDidMount() {
        axios.get('https://github.com/login/oauth/authorize')
        .then((response) => {
            console.log(response)
        })
    }

    render() {
        return(
            <div>
                <h1>Project Verat</h1>
            </div>
        )
    }
}