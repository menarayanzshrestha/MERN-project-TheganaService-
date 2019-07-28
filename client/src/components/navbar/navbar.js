import React from 'react';

import { getRole } from '../../api/authenticate';

import { Menu, Responsive, Image } from 'semantic-ui-react';
import { NavLink, Redirect } from 'react-router-dom';

import TheganaSeviceslogo from '../../assets/theganasevices.png';

import bars from './assets/svg/menu.svg';

import styles from './navbar.module.scss';

// import { PropTypes } from 'prop-types';
import ButtonsOr from '../buttonsOr/buttonsor';

const NAV_LINKS = [
    {
        "link": "/",
        "name": "My Profile"
    },
    {
        "link": "/allusers",
        "name": "All Users"
    },
    {
        "link": "/adduser",
        "name": "Add User"
    },
    {
        "link": "/article",
        "name": "Article"
    },
]

const NAV_LINKS_NOTADMIN = [
    {
        "link": "/",
        "name": "My Profile"
    },
    {
        "link": "/article",
        "name": "Article"
    },
]

export default class Navbar extends React.Component {

    constructor() {
        super();
        this.state = {
            role: "",
            visible: false,
            redirectTo: null
        }
    }

    componentDidMount = () => {
        this._fetchRole();
    }

    _fetchRole = () => {

        let role = getRole();

        this.setState ({
            role
        })

    }

    _toggleNavbar = (show = false) => {

        this.setState({
            visible: show,
        });
    }

    _redirectTo = (page) => {
        this.setState({
            redirectTo: page
        });
    }

    render() {

        const {visible, redirectTo, role} = this.state;

        if(redirectTo !== null) {
            this._redirectTo(null);
            return <Redirect to={`/${redirectTo}`} />
        }

        return (

            <nav className={styles.navbar}>

                <Menu secondary className={styles.navMenu}>

                    <Responsive maxWidth={850}>
                        <div className={styles.barsWrapper}>
                            <Image onClick={e => this._toggleNavbar(!this.state.visible)} className={styles.bars} src={bars} name="bars" />
                            <Menu.Item 
                                
                                name='My Profile' 
                                children={
                                    <NavLink to="/">
                                        <img 
                                            className={styles.logo} 
                                            src={TheganaSeviceslogo} 
                                            alt="TheganaSeviceslogo" 
                                        />
                                    </NavLink>
                                }
                            />
                        </div>
                    </Responsive>

                    <Responsive minWidth={851}>
                        <Menu.Item 
                            
                            name='My Profile' 
                            children={
                                <NavLink to="/">
                                    <img 
                                        className={styles.logo} 
                                        src={TheganaSeviceslogo} 
                                        alt="TheganaSeviceslogo" 
                                    />
                                </NavLink>
                            }
                        />
                    </Responsive>
                    
                    <Responsive maxWidth={850}>
                        <NavSmallScreen 
                            _toggleNavbar={this._toggleNavbar} 
                            visible={visible} 
                            navLinks={ role === "admin" ? NAV_LINKS : NAV_LINKS_NOTADMIN }   
                        />
                    </Responsive>
                    <Responsive as={Menu} secondary minWidth={851}>
                        <NavLargeScreen 
                            navLinks={ role === "admin" ? NAV_LINKS : NAV_LINKS_NOTADMIN } 
                        />
                    </Responsive>

                    <Menu.Item
                        name='buttons'
                        
                        children={
                            <ButtonsOr 
                                shouldReduce={false} 
                                firstCondition="Logout" 
                                onClickFirst={this.props.logout}
                              
                            />
                        }
                    />

                </Menu>

            </nav>
        
        );

    }

}

const NavLargeScreen = ({ navLinks }) => (
    <Menu.Menu>
        <Menu secondary>
            {
                navLinks && navLinks.map((navLink, i) => (
                    <Menu.Item
                        key={i}
                        className={styles.navItem}
                        name={navLink.name}
                        children={<NavLink exact activeClassName={styles.active} to={`${navLink.link}`}>{navLink.name}</NavLink>}
                    />
                ))
            }
        </Menu>
    </Menu.Menu>
  );
  
const NavSmallScreen = ({ navLinks, visible, _toggleNavbar }) => (
    <Menu.Menu>
        <Menu secondary vertical className={`${styles.verticalNavbar} ${visible ? styles.visible : ''}`}>
        {
            navLinks && navLinks.map((navLink, i) => (
                <Menu.Item
                    key={i}
                    className={styles.navItem}
                    name={navLink.name}
                    children={<NavLink exact activeClassName={styles.active} to={`${navLink.link}`} onClick={e => _toggleNavbar(false)}>{navLink.name}</NavLink>}
                />
            ))
        }
        </Menu>
    </Menu.Menu>
);
