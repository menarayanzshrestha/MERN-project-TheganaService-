import React, { Component } from 'react';
import { Divider, Container } from "semantic-ui-react";

export default class NoMatchPage extends Component {

    render() {

        return (
            <div style={{ paddingTop : "45px" }}>
                <Divider/>

                <Container>
                    <h1>404 Error Page.</h1>
                </Container>

            </div>
        )
    }
}
