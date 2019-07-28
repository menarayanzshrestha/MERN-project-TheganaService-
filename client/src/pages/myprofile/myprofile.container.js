import React, { Component } from 'react';
import MyProfile from './myprofile';
import request from '../../api/request';
import { Divider, Container } from 'semantic-ui-react';
import { getEmail, getUserId, getRole } from '../../api/authenticate';

import swal from "sweetalert";

export class MyProfileContainer extends Component {

    constructor(){
        super();
        this.state = {
            _id : "",
            email : "",
            role: "",
            password: "",
            confirmPassword : "",
            open : false,
            loading : false
        }
    }

    componentDidMount = () => {
        this._fetchData();
    }

    _fetchData = () => {

        let _id = getUserId();
        let email = getEmail();
        let role = getRole();

        this.setState ({
            _id,
            email,
            role
        })

    }

    openModal = () => {
        this.setState({ 
            open: true 
        })
    }

    closeModal = () => {
        this.setState({ 
            open: false
        })
    }

    _onChange = (value, field) => {
        console.log(value,field)
        this.setState({
            [field] : value
        })
    }

    passwordSubmit = (event) => {
        
        event.preventDefault();

        if(this.state.password !== this.state.confirmPassword) {
            swal("Confirm Password donot match");
            return;
        }

        this.setState({
            loading : true
        })
        request(`user/changepassword/${this.state._id}`,'post',
        {
            password : this.state.password,
            confirmPassword : this.state.confirmPassword,
        })
        .then (res => {
            console.log(res);
            swal(res.data.log);
            this.closeModal();

            this.setState({
                loading : false,
                password: "",
                confirmPassword : ""
            })
        })
        .catch(error => {

            if(error.response !== undefined) {
                if (error.response.data && error.response.data.message[0].msg){
                    swal("Opps!!! " + error.response.data.message[0].msg);
    
                }
                else{
                    swal("Opps!!! " + error.response.data.message);
    
                }
            }
            else{
                swal("Opps!!!, We couldn't connect to our servers, please check your internet connection ");
            }
            console.log(error);
            this.setState({
                loading : false
            })
        })

    }



    render() {

        return (
            <div style={{ paddingTop : "45px" }}>
                <Divider />

                <Container>
                    
                    <MyProfile 
                        {...this.state}
                        _onChange={this._onChange}
                        passwordSubmit={this.passwordSubmit}
                        openModal={this.openModal}
                        closeModal={this.closeModal}
                    /> 
                    
                </Container>
            </div>
        )
    }
}

export default MyProfileContainer ;
