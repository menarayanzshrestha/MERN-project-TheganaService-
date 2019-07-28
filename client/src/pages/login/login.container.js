import React, { Component } from 'react';
import Login from './login';
import request, { setDefaults } from '../../api/request';
import swal from 'sweetalert';
// import { Input } from 'semantic-ui-react';

export class LoginContainer extends Component {

    constructor() {
        super();
        this.state = {
            email : "",
            password: "",
            OTP: "",
            loading : false,
            open : false
        }
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
        this.setState({
            [field] : value
        })
    }

    onSubmit = (event) => {

        event.preventDefault();

        this.setState({
            loading : true
        })
        request('/login', "post",{
            email: this.state.email,
            password: this.state.password
        })
        // .then( res => {
        //     localStorage.setItem('LoginJWT', JSON.stringify(res.data)) 
        // })
        // .then( res => setDefaults() ) 
        .then(res => {
            console.log(res);
            alert(res.data.message);
            this.setState({
                loading : false
            },()=>{
                // this.props.login();
                this.openModal();
            })
        })
        .catch(error => {

            
            console.log(error);

            if(error.response !== undefined) {
                if (error.response.data.message[0].message){
                    swal(error.response.data.message[0].message);
                }
                else{
                    swal(error.response.data.message);
                }
            }
            else{
                swal("Opps!!!, We couldn't connect to our servers, please check your internet connection ");
            }

            this.setState({
                loading : false
            })
        })
    }

    OTPsubmit = (event) => {

        event.preventDefault();

        this.setState({
            OTPloading : true
        })

        let apiCall = request('/login/otp', "post",{
            email: this.state.email,
            OTP: this.state.OTP
        })

        apiCall.then( res => {
            localStorage.setItem('NarayanShresthaJWT', JSON.stringify(res.data)) 
        })

        apiCall.then( res => setDefaults() ) 

        apiCall.then( res => {

            console.log(res);
            // swal(res.data.message);

            this.setState({
                OTPloading : false
            }, () => {
                this.props.login();
            })
        })

        .catch(error => {

            console.log(error);

            if(error.response !== undefined) {
                if (error.response.data.message[0].message){
                    swal(error.response.data.message[0].message);
                }
                else{
                    swal(error.response.data.message);
                }
            }
            else{
                swal("Opps!!!, We couldn't connect to our servers, please check your internet connection ");
            }

            this.setState({
                OTPloading : false
            })
        })

    }

    
    render() {

        console.log(this.state);

        console.log(this.props.location,"in login form");

        return (
            <div style={{ paddingTop : "45px" }}>

                <Login 
                    {...this.state}
                    _onChange={this._onChange}
                    onSubmit={this.onSubmit}
                    openModal={this.openModal}
                    closeModal={this.closeModal}
                    OTPsubmit={this.OTPsubmit}
                />

            </div>
        )
    }
}

export default LoginContainer;
