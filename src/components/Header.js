import React from 'react';
import { Link } from 'react-router-dom';

const LoggedOutView = props => {
    if (!props.currentUser) {
        return (
            <ul className="nav navbar-nav pull-xs-right">
                <li className="nav-item">
                    <Link to="/login" className="nav-link">
                        Sign in
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to="/register" className="nav-link">
                        Sign up
                    </Link>
                </li>

            </ul>
        );
    }
    return null;
};

const LoggedInView = props => {
    if (props.currentUser) {
        return (
            <ul className="nav navbar-nav pull-xs-right">

                <li className="nav-item">
                    <a className="nav-link">
                        <Link
                            to={`/@${props.currentUser.username}`}>
                            <img src={props.currentUser.image} className="user-pic" alt={props.currentUser.username} />
                            {props.currentUser.username}
                        </Link>
                    </a> </li>
                <li className="nav-item">
                    <a className="nav-link"><Link to="/editor">
                        <i className="ion-compose"></i>New Post
                    </Link></a></li>
                <li className="nav-item">
                    <a className="nav-link"><Link to="/settings">
                        <i className="ion-gear-a"></i> Settings
                    </Link></a>
                </li>
            </ul>
        );
    }

    return null;
};

class Header extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-light">
                <div className="container">

                    <Link to="/" className="navbar-brand">
                        {this.props.appName.toLowerCase()}
                    </Link>

                    <LoggedOutView currentUser={this.props.currentUser} />

                    <LoggedInView currentUser={this.props.currentUser} />
                </div>
            </nav>
        );
    }
}

export default Header;
