import React, { Component } from 'react';
import { Segment, Form, Button, Container, Dropdown } from 'semantic-ui-react';
 
export class AddUser extends Component {

    render() {

        const { email, _onChange, password,role, confirmPassword, _userSubmit, loading, Options } = this.props;
        
        return (

            <Container>
                <Segment>
                    <Form>
                        <Form.Field>
                            <label>Email</label>
                            <input placeholder='Email' name="email" type="text" required value={email} onChange={(event,data) => _onChange(event.target.value,"email")}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <input placeholder='Password' type="Password" required value={password} onChange={(event,data) => _onChange(event.target.value,"password")}/>
                        </Form.Field>
                        <Form.Field>
                            <label> Confirm Password</label>
                            <input placeholder='Confirm Password' type="Password" required value={confirmPassword} onChange={(event,data) => _onChange(event.target.value,"confirmPassword")}/>
                        </Form.Field>
                        <Form.Field>
                            <label> Role</label>
                            <Dropdown
                                name="role"
                                placeholder='Select Role'
                                fluid
                                selection
                                options={Options}
                                value={role}
                                required
                                onChange={(event,data) => _onChange(data.value, 'role')} 
                            />
                        </Form.Field>
                        <Button type='submit' primary onClick={(event)=> _userSubmit(event)} loading={loading}>Submit</Button>
    
                    </Form>
                </Segment>
            </Container>
        )
    }
}

export default AddUser;
