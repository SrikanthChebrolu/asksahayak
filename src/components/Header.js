import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};


class Header extends React.Component {
    state = {
        auth: true,
        anchorEl: null,
    };

    render() {

        const { classes } = this.props;

        /*return (
         <nav className="navbar navbar-light">
         <div className="container">

         <Link to="/" className="navbar-brand">
         {this.props.appName.toLowerCase()}
         </Link>

         <LoggedOutView currentUser={this.props.currentUser} />

         <test currentUser={this.props.currentUser} />
         </div>
         </nav>
         );*/

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            <Link to="/" className="navbar-brand">
                                {this.props.appName.toLowerCase()}
                            </Link>
                        </Typography>

                        {!this.props.currentUser && (
                            <div>
                                <ul className="nav navbar-nav pull-xs-right">

                                    <li className="nav-item">
                                        <Link to="/" className="nav-link">
                                            Home
                                        </Link>
                                    </li>

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
                            </div>
                        )}
                        {this.props.currentUser && (
                            <div>
                                <ul className="nav navbar-nav pull-xs-right">

                                    <li className="nav-item">
                                        <Link to="/" className="nav-link">
                                            Home
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link to="/editor" className="nav-link">
                                            <i className="ion-compose"></i>&nbsp;New Post
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link to="/settings" className="nav-link">
                                            <i className="ion-gear-a"></i>&nbsp;Settings
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link
                                            to={`/@${this.props.currentUser.username}`}
                                            className="nav-link">
                                            <img src={this.props.currentUser.image} className="user-pic" alt={this.props.currentUser.username} />
                                            {this.props.currentUser.username}
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
