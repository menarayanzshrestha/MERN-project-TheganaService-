import React, { Component } from 'react';
import {  Segment, Form, Button, Container, Input, Modal } from 'semantic-ui-react';

export class Login extends Component {
    render() {

        const { email, password, _onChange, onSubmit, loading, open, openModal, closeModal, OTPsubmit, OTPloading } = this.props;
        
        return (

            <Container>
                <Segment>
                    <h1>Login Page</h1>
                    <Form onSubmit={(event) => onSubmit(event)}>
                        <Form.Field>
                            <label>Email</label>
                            <Input placeholder='Email' required value={email} onChange={(event,data) => _onChange(data.value,"email")}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <Input placeholder='Password' type="password" required value={password} onChange={(event,data) => _onChange(data.value,"password")}/>
                        </Form.Field>

                        <Button primary loading={loading}>Login</Button>
                    </Form>

                </Segment>

                <Modal
                    open={open}
                    onOpen={openModal}
                    onClose={closeModal}
                    size='mini'
                    closeIcon
                >
                    <Modal.Header>Enter Your OTP</Modal.Header>
                    <Modal.Content>
                        <Input 
                            icon='key' 
                            iconPosition='left' 
                            placeholder='OTP Number' 
                            name="OTP" 
                            onChange={(event,data) => _onChange(data.value,"OTP")}
                        />
                    </Modal.Content>
                    <Modal.Actions>
                        <Button  content='Submit' onClick={(event)=> OTPsubmit(event)} loading={OTPloading}/>
                    </Modal.Actions>
                </Modal>
            </Container>
        )
    }
}

export default Login;
