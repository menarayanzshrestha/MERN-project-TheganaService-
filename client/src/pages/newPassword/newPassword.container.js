import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import NewPassword from './newPassword';
import request from '../../api/request';
import swal from 'sweetalert';
import { Divider } from 'semantic-ui-react';

export class NewPasswordContainer extends Component {

    constructor() {
        super();
        this.state = {
            password: "",
            confirmPassword:"",
            loading : false,
            redirect : false
        }
          
    }

    componentDidMount = () => {
        this.props.logout();
    }

    _onChange = (value, field) => {
        this.setState({
            [field] : value
        })
    }

    onNewPasswordSubmit = (event) => {

        event.preventDefault();

        const {password, confirmPassword } = this.state ; 

        if(password !== confirmPassword) {
            swal("Confirm Password donot match");
            return;
        }

        this.setState({
            loading : true
        })

        let token = window.location.pathname.split('verification/')[1] ;

        
        request(`verification/${token}`, "post", {
            
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        })
        
        .then(res => {
            console.log(res);
           
            this.setState({
                loading : false,
                redirect : true
            })
        })
        .catch(error => {

            
            console.log(error);

            if(error.response !== undefined) {
                if (error.response.data.message[0].log){
                    swal(error.response.data.message[0].log);
                }
                else{
                    swal(error.response.data.log);
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

    
    
    render() {
        if (this.state.redirect ) {
            return <Redirect to= "/" />
        }

        return (


            <div style={{ paddingTop : "45px" }}>

                <Divider />

                <NewPassword 
                    {...this.state}
                    _onChange={this._onChange}
                    onNewPasswordSubmit={this.onNewPasswordSubmit}
                />

            </div>
        )
    }
}

export default NewPasswordContainer;
