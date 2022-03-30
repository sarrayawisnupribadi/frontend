import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import Customer from './pages/customer'

export default class Main extends React.Component{
    render(){
        return(
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/login' component={Login}/>
                <Route path='/customer' component={Customer}/>
            </Switch>
        )
    }
}