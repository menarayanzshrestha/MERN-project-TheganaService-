import React, { Component } from 'react';
import AllUser from './alluser';
import request from '../../api/request';
import { Divider, Container, Loader } from 'semantic-ui-react';
import swal from 'sweetalert';

export default class AllUserContainer extends Component {

    constructor(){
        super();
        this.state = {
            allusers : [],
            loading : false,
            submitLoading : false,
            role: "",
            password: "",
            confirmPassword : "",
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
            ],
            open : {
                role : false,
                password: false
            },
            forModalToShow : []
        }
    }

    componentDidMount = () => {
        this._fetchAllUser();
    }

    _fetchAllUser = () => {

        this.setState({
            loading : true
        })
        request('alluser','get')
        .then (res => {

            let allusers = res.data.data;

            this.setState({
                allusers ,
                loading : false
            })
        })
        .catch(err => {
            console.log(err);
            this.setState({
                loading : false
            })
        })
    }

    openModal = (data,index) => {

        let open = this.state.open;
        open[data] = true;

        let forModalToShow = this.state.allusers[index];

        this.setState({ 
            open,
            forModalToShow
        })
    }

    closeModal = (data) => {

        let open = this.state.open;
        open[data] = false

        this.setState({ 
            open
        })
    }

    _onChange = (value, field) => {

        let forModalToShow = this.state.forModalToShow;
        forModalToShow[field] = value;

        this.setState({
            forModalToShow
        })
    }

    _onChanges = (value, field) => {
        
        this.setState({
            [field] : value
        })
    }

   
    _onRoleSubmit = (event, _id) => {
        event.preventDefault();

        this.setState({
            submitLoading : true
        })
        request(`user/changerole`,'post', {
           _id : _id,
            role : this.state.forModalToShow.role
        })
        .then (res => {

            this.closeModal("role");

            console.log(res);
           
            this.setState({
                submitLoading : false
            })

            swal(res.data.message );

        })
        .catch(error => {    

            if(error.response !== undefined) {
                if (error.response.data.message[0].msg){
                    swal("Opps!!! " + error.response.data.message[0].msg);
    
                }
                else{
                    swal("Opps!!! " + error.response.data.message);
    
                }
            }
            else{
                swal("Opps!!!, We couldn't connect to our servers, please check your internet connection ");
            }
            
            this.setState({
                submitLoading : false
            })
        })

    }

    _onPasswordSubmit = (event, _id) => {

        event.preventDefault();

        const {
            password, confirmPassword
        } = this.state;

        if (password !== confirmPassword) {
            swal (" Confirm Password donot match");
            return
        }

        this.setState({
            submitLoading : true
        })
        request(`user/changepassword/${_id}`,'post', {
           
            password : this.state.password,
            confirmPassword : this.state.confirmPassword,
        })
        .then (res => {

            this.closeModal("password");

            console.log(res);
           
            this.setState({
                submitLoading : false,
                password : "",
                confirmPassword : ""
            })

            swal(res.data.message );

        })
        .catch(error => {    

            if(error.response !== undefined) {
                if (error.response.data.message[0].msg){
                    swal("Opps!!! " + error.response.data.message[0].msg);
    
                }
                else{
                    swal("Opps!!! " + error.response.data.message);
    
                }
            }
            else{
                swal("Opps!!!, We couldn't connect to our servers, please check your internet connection ");
            }
            
            this.setState({
                submitLoading : false
            })
        })


    }

    
    render() {

        const { loading } = this.state;
        return (

            <div style={{ paddingTop : "45px" }}>
                <Divider />

                <Container>

                    {
                        loading ? 
                            <Loader active inline='centered' />
                            :
                            <AllUser 
                                {...this.state}
                                _onChange={this._onChange}
                                _onChanges={this._onChanges}
                                _onRoleSubmit={this._onRoleSubmit}
                                _onPasswordSubmit={this._onPasswordSubmit}
                                openModal={this.openModal}
                                closeModal={this.closeModal}
                            />
                    }
                    
                </Container>
            </div>
            
        )
    }
}
