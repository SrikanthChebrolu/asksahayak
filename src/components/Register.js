import React from 'react';
import agent from '../agent';
import ListErrors from './ListErrors';
import { connect } from 'react-redux';
import {
    UPDATE_FIELD_AUTH,
    REGISTER,
    REGISTER_PAGE_UNLOADED
} from '../constants/actionTypes';
import { withStyles } from 'material-ui/styles';
import compose from 'recompose/compose';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
    onChangeEmail: value =>
        dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
    onChangePassword: value =>
        dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
    onChangeUsername: value =>
        dispatch({ type: UPDATE_FIELD_AUTH, key: 'username', value }),
    onSubmit: (username, email, password) => {
        const payload = agent.Auth.register(username, email, password);
        console.log(payload);
        dispatch({ type: REGISTER, payload })
    },
    onUnload: () =>
        dispatch({ type: REGISTER_PAGE_UNLOADED })
});

const styles = theme => ({

    root: theme.mixins.gutters({
        paddingTop: 16,
        paddingBottom: 16,
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
    }),
    titleBar: {
        background:
        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

class Register extends React.Component {
    constructor() {
        super();
        this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
        this.changePassword = ev => this.props.onChangePassword(ev.target.value);
        this.changeUsername = ev => this.props.onChangeUsername(ev.target.value);
        this.submitForm = (username, email, password) => ev => {
            ev.preventDefault();
            this.props.onSubmit(username, email, password);
        }
    }

    componentWillUnmount() {
        this.props.onUnload();
    }

    render() {
        const email = this.props.email;
        const password = this.props.password;
        const username = this.props.username;

      /*return (
       <div className="auth-page">
       <div className="container page">
       <div className="row">

       <div className="col-md-6 offset-md-3 col-xs-12">
       <h1 className="text-xs-center">Sign Up</h1>
       <p className="text-xs-center">
       <Link to="/login">
       Have an account?
       </Link>
       </p>

       <ListErrors errors={this.props.errors} />

       <form onSubmit={this.submitForm(username, email, password)}>
       <fieldset>

       <fieldset className="form-group">
       <input
       className="form-control form-control-lg"
       type="text"
       placeholder="Username"
       value={this.props.username}
       onChange={this.changeUsername} />
       </fieldset>

       <fieldset className="form-group">
       <input
       className="form-control form-control-lg"
       type="email"
       placeholder="Email"
       value={this.props.email}
       onChange={this.changeEmail} />
       </fieldset>

       <fieldset className="form-group">
       <input
       className="form-control form-control-lg"
       type="password"
       placeholder="Password"
       value={this.props.password}
       onChange={this.changePassword} />
       </fieldset>

       <button
       className="btn btn-lg btn-primary pull-xs-right"
       type="submit"
       disabled={this.props.inProgress}>
       Sign up
       </button>

       </fieldset>
       </form>
       </div>

       </div>
       </div>
       </div>
       );*/

        const { classes } = this.props;

        return (
            <div>

              <Paper className={classes.root} elevation={4}>

                <ListErrors errors={this.props.errors} />

                <form noValidate onSubmit={this.submitForm(username, email, password)} autoComplete="off" autoFill="off">
                  <TextField
                      required
                      id="name"
                      label="Name"
                      type="text"
                      placeholder="Username"
                      value={this.props.username}
                      onChange={this.changeUsername}
                      className={classes.textField}
                      margin="normal"
                  />
                  <TextField
                      required
                      id="email"
                      label="Email"
                      type="email"
                      placeholder="Email"
                      value={this.props.email}
                      onChange={this.changeEmail}
                      className={classes.textField}
                      margin="normal"
                  />
                  <TextField
                      required
                      id="required"
                      label="Required"
                      type="password"
                      placeholder="Password"
                      value={this.props.password}
                      onChange={this.changePassword}
                      className={classes.textField}
                      margin="normal"
                  />

                  <Button variant="raised" color="primary" type="submit" className={classes.button}  disabled={this.props.inProgress}>
                    Sign up
                  </Button>
                </form>
              </Paper>
            </div>
        );
    }
}

export default compose(
    withStyles(styles, { withTheme: true }, { name: 'Register' }),
    connect(mapStateToProps, mapDispatchToProps)
)(Register);