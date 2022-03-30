import React from "react";
import './login.css'
import axios from "axios";
export default class Login extends React.Component{
    constructor(){
        super()
        this.state = {
            username : "",
            password : ""
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handleLogin = (e) => {
        e.preventDefault() 
        let data = {
            username : this.state.username,
            password : this.state.password
        }
        let url = "http://localhost:8080/store/admin/auth"
        axios.post(url, data)
        .then(res => {
            if (res.data.logged){
                let name = res.data.data.name
                let admin = res.data.data
                let token = res.data.token
                localStorage.setItem("name", name)
                localStorage.setItem("admin", JSON.stringify(admin))
                localStorage.setItem("token", token)
                window.location = '/'
            }
            else{
                window.alert(res.data.message)
            }
        })
    }
    render(){
        return(
            <div className="wrapper">
                <div className="text-center mt-4 name"> Login </div>
                <form className="p-3 mt-3" onSubmit={(e) => this.handleLogin(e)}>
                    <div className="form-field d-flex align-items-center"> <span className="far fa-user"></span>
                     <input type="text" name="username" id="userName" placeholder="Username" onChange={this.handleChange} value={this.state.username}/> 
                    </div>
                    <div className="form-field d-flex align-items-center"> <span className="fas fa-key"></span>
                     <input type="password" name="password" id="pwd" placeholder="Password" onChange={this.handleChange} value={this.state.password}/>
                    </div> 
                    <button className="btn mt-3" type="submit">Login</button>
                </form>
                <div className="text-center fs-6"> <a href="#">Forget password?</a> or <a href="#">Sign up</a> </div>
            </div>
        );
    }
}