import React, { Component } from 'react';

import { Segment, Container } from 'semantic-ui-react';

export class Article extends Component {


    render() {
        const { role } = this.props;

        return (
            
            <Container>

                <Segment>

                    <h1>Admin / Developer / Manager ( Difference )</h1><br/>

                    {(role === "admin") ? <><p>Only Admin can read </p><br/></> : "" }
                    {(role === "admin" |role ===  "developer") ? <><p>Only Admin / Developer can read</p><br/></> : "" }
                    {(role === "admin" |role ===  "manager") ? <><p>Only Admin / Manager can read </p><br/></> : "" }

                </Segment>

            </Container>
              
        )
    }
}

export default Article;
