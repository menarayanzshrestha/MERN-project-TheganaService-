import React, { Component } from 'react';
import { getRole } from '../../api/authenticate';
import { Divider, Container } from 'semantic-ui-react';
import Article from './article';

export class ArticleContainer extends Component {

    constructor() {
        super();
        this.state = {
            role: ""
        }
    }

    componentDidMount = () => {
        this._fetchData();
    }

    _fetchData = () => {

        let role = getRole();

        this.setState ({
            role
        })

    }

    render() {

        return (
            <div style={{ paddingTop : "45px" }}>
                <Divider />

                <Container>

                    <Article {...this.state}/>

                </Container>

            </div>
        )
    }
}

export default ArticleContainer;
