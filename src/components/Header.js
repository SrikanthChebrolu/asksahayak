import {
    Button,
    Icon,
    Image,
    Menu,
    Dropdown
} from 'semantic-ui-react'
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../public/images/asksahayak.png';

const LoggedOutView = props => {
    if (!props.currentUser) {
        return (
            <Menu.Item position='right'><Link
                to="/login">
                <Button size='large'>
                    Log in</Button></Link>
                <Link
                    to="/register"><Button size='large' style={{ marginLeft: '0.5em' }}> Sign Up</Button></Link>
            </Menu.Item>
        );
    }
    return null;
};

const LoggedInView = props => {

    if (props.currentUser) {
        const trigger = (
            <span>
                <Image avatar src={props.currentUser.image} alt={props.currentUser.username}/> <strong>{props.currentUser.username}</strong>
            </span>
        )
        return (
            <Menu.Item position='right'>
                <Dropdown trigger={trigger}  pointing='top left' icon='dropdown'>
                    <Dropdown.Menu>
                        <Dropdown.Item><Link to="/editor">
                            <Icon name="signup"/>New Post
                        </Link></Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item >
                            <Link to="/settings" >
                                <Icon name="settings"/>Settings
                            </Link>
                        </Dropdown.Item>
                    </Dropdown.Menu>

                </Dropdown>
            </Menu.Item>
        );
    }

    return null;
};

class Header extends React.Component {
    render() {
        return (
            <Menu>

                <Link to="/">
                    <Image
                        size='tiny'
                        src={logo}
                        alt="asksahayak"
                        style={{padding: '10px', marginLeft:'20%'}}
                    />
                </Link>

                <LoggedOutView currentUser={this.props.currentUser} />

                <LoggedInView currentUser={this.props.currentUser} />

            </Menu>
        );
    }
}

export default Header;
