import React, { Component } from 'react';
import { Container, Table, Button, Modal, Form } from 'semantic-ui-react';

export class MyProfile extends Component {

    render() {

        const { _id, email, role, open, openModal, closeModal, passwordSubmit, _onChange, password, confirmPassword, loading } = this.props;
        console.log(this.props);
        return (
            <Container>

                <Button primary onClick={(event) => openModal()}> Change Password </Button>

                <Table fixed basic stackable>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Role</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                {_id}
                            </Table.Cell>
                            <Table.Cell>
                                {email}
                            </Table.Cell>
                            <Table.Cell>
                                {role}
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>

                <Modal
                    open={open}
                    onOpen={openModal}
                    onClose={closeModal}
                    size='mini'
                    closeIcon
                >
                    <Modal.Header>Password Change</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Password</label>
                                <input placeholder='New Password' name="password" type="Password" required value={password} onChange={(event,data) => _onChange(event.target.value,"password")}/>
                            </Form.Field>
                            <Form.Field>
                                <label> Confirm Password</label>
                                <input placeholder='Confirm Password' type="Password" required value={confirmPassword} onChange={(event,data) => _onChange(event.target.value,"confirmPassword")}/>
                            </Form.Field>
        
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button type='submit' primary onClick={(event)=> passwordSubmit(event)} loading={loading}>Submit</Button>
                    </Modal.Actions>
                </Modal>

            </Container>

            
        )
    }
}

export default MyProfile;
