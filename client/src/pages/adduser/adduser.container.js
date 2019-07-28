import React, { Component } from 'react';
import AddUser from './adduser';
import { Divider, Container } from 'semantic-ui-react';
import request from '../../api/request';
import swal from 'sweetalert';


export class AddUserContainer extends Component {

    constructor(){
        super();
        this.state = {
            email : "",
            password : "",
            confirmPassword : "",
            role : "",
            loading : false,
            Options : [
                {
                    key: 'Admin',
                    text: 'Admin',
                    value: 'admin'
                  },
                  {
                    key: 'Developer',
                    text: 'Developer',
                    value: 'developer'
                  },
                  {
                    key: 'Manager',
                    text: 'Manager',
                    value: 'manager'
                  }
            ]
        }
    }
    
    _onChange = (value, field) => {
        this.setState({
            [field] : value
        })
    }

    _userSubmit = (event) => {

        event.preventDefault();

        this.setState({
            loading : true
        })
        request(`signup`,'post',
        {
            email : this.state.email,
            password : this.state.password,
            confirmPassword : this.state.confirmPassword,
            role : this.state.role
        })
        .then (res => {

            console.log(res);
            swal(res.data.message);

            this.setState({
                loading : false,
                email : "",
                password : "",
                confirmPassword : "",
                role : ""
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

                    <AddUser 
                        {...this.state}
                        _onChange={this._onChange}
                        _userSubmit={this._userSubmit}
                
                    />
                    
                </Container>
            </div>
        )
    }
}

export default AddUserContainer ;
