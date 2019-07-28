import React, { Component } from 'react';
import {  Segment, Form, Button, Container, Input } from 'semantic-ui-react';

export class Login extends Component {
    render() {

        const {  password, confirmPassword, _onChange, onNewPasswordSubmit, loading } = this.props;
        
        return (

            <Container>

                <Segment>
                    <h1>New Password</h1>
                    <Form onSubmit={(event) => onNewPasswordSubmit(event)}>
                    
                        <Form.Field>
                            <label>Password</label>
                            <Input placeholder='Password' type="password" required value={password} onChange={(event,data) => _onChange(data.value,"password")}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Confurm Password</label>
                            <Input placeholder='Password' type="password" required value={confirmPassword} onChange={(event,data) => _onChange(data.value,"confirmPassword")}/>
                        </Form.Field>

                        <Button primary loading={loading}>Submit</Button>
                    </Form>

                </Segment>

            </Container>
        )
    }
}

export default Login;
