import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import { connect } from 'react-redux';
import { Button, Form, Grid, Header, Message, Segment, Container } from 'semantic-ui-react';
import React from 'react';
import agent from '../agent';
import {
    UPDATE_FIELD_AUTH,
    REGISTER,
    REGISTER_PAGE_UNLOADED
} from '../constants/actionTypes';

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
        dispatch({ type: REGISTER, payload })
    },
    onUnload: () =>
        dispatch({ type: REGISTER_PAGE_UNLOADED })
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

        return (
            <Container>
              <div className='login-form'>
                  {/*
                   Heads up! The styles below are necessary for the correct render of this example.
                   You can do same with CSS, the main idea is that all the elements up to the `Grid`
                   below must have a height of 100%.
                   */}
                <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
                <Grid
                    textAlign='center'
                    style={{height: '100%'}}
                    verticalAlign='middle'
                >
                  <Grid.Column style={{maxWidth: 450}}>
                    <Header as='h2' color='teal' textAlign='center'>
                        {' '}Sign Up
                    </Header>
                    <ListErrors errors={this.props.errors} />
                    <Form onSubmit={this.submitForm(username, email, password)}>
                      <Segment stacked>
                        <Form.Input
                            icon='user'
                            iconPosition='left'
                            placeholder="Username"
                            value={this.props.username}
                            onChange={this.changeUsername}
                        />
                        <Form.Input
                            icon='mail'
                            iconPosition='left'
                            placeholder='E-mail address'
                            type='email'
                            value={this.props.email}
                            onChange={this.changeEmail}
                        />
                          <Form.Input
                              icon='phone'
                              iconPosition='left'
                              placeholder='Phone Number'
                              type='number'
                              value={this.props.phonenumber}
                              onChange={this.changePhoneNumber}
                          />
                        <Form.Input
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            value={this.props.password}
                            onChange={this.changePassword}
                        />

                        <Button color='teal' type="submit" fluid size='large'  loading={this.props.inProgress}>Sign Up</Button>
                      </Segment>
                    </Form>
                    <Message>
                      Already have an account? <Link to="/login">Sign In</Link>
                    </Message>
                  </Grid.Column>
                </Grid>
              </div>
            </Container>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
