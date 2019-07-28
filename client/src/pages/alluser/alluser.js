import React, { Component } from 'react';
import { Segment, Table,Form, Dropdown, Button, Modal } from 'semantic-ui-react';

export class AddDoctors extends Component {
    render() {

        const { confirmPassword, password, allusers, open, openModal, closeModal, submitLoading, Options,  _onChange, _onChanges, _onRoleSubmit,_onPasswordSubmit, forModalToShow } = this.props;
   
        return (
            <Segment>
                <Table fixed basic stackable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Role</Table.HeaderCell>
                            <Table.HeaderCell>Created At</Table.HeaderCell>
                            <Table.HeaderCell>Options</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                       
                            {
                                allusers && allusers.map((data, index) => {
                                    return (
                                        <>
                                            <Table.Row key={index}>
                                                <Table.Cell>
                                                    {data.email}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {data.role}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {data.createdAt}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <Button icon={"edit"}  onClick={()=>openModal("role",index)} color="teal"/>
                                                    <Button icon={"admin"}  onClick={()=>openModal("password",index)}>Change password</Button>                                            </Table.Cell>
                                            </Table.Row>
                                            
                                        </>
                                    )
                                })
                            }
                            
                    </Table.Body>
                </Table>

                <Modal
                    open={open.role}
                    onOpen={()=>openModal("role")}
                    onClose={()=>closeModal("role")}
                    size='mini'
                    closeIcon
                >
                    <Modal.Header>Edit Profile</Modal.Header>
                    <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>Email</label>
                            <input placeholder='Email' name="email" type="text" required value={forModalToShow.email} />
                        </Form.Field>

                        <Form.Field>
                            <label> Role</label>
                            <Dropdown
                                name="role"
                                placeholder='Select Role'
                                fluid
                                selection
                                options={Options}
                                value={forModalToShow.role}
                                required
                                onChange={(event,data) => _onChange(data.value, 'role')} 
                            />
                        </Form.Field>
                        
                    </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button type='submit' primary onClick={(event)=> _onRoleSubmit(event,forModalToShow._id)} loading={submitLoading}>Submit</Button>
    
                    </Modal.Actions>
                </Modal>

                <Modal
                    open={open.password}
                    onOpen={()=>openModal("password")}
                    onClose={()=>closeModal("password")}
                    size='mini'
                    closeIcon
                >
                    <Modal.Header>Change Password</Modal.Header>
                    <Modal.Content>
                    <Form>
                        <Form.Field>
                            <label>New Password</label>
                            <input placeholder='New Password' name="password" type="password" value={password} required onChange={(event,data) => _onChanges(event.target.value, 'password')}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Confirm Password</label>
                            <input placeholder='Confirm Password' name="confirmPassword" type="password" value={confirmPassword} required onChange={(event,data) => _onChanges(event.target.value, 'confirmPassword')}/>
                        </Form.Field>
                        
                    </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button type='submit' primary onClick={(event)=> _onPasswordSubmit(event,forModalToShow._id)} loading={submitLoading}>Submit</Button>
    
                    </Modal.Actions>
                </Modal>

                
            </Segment> 
        )
    }
}

export default AddDoctors;
