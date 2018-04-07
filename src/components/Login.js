import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  LOGIN_PAGE_UNLOADED
} from '../constants/actionTypes';
import { Button, Form, Grid, Header, Message, Segment, Container } from 'semantic-ui-react'


const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
    onChangeEmail: value =>
        dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
    onChangePassword: value =>
        dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
    onSubmit: (email, password) =>
        dispatch({ type: LOGIN, payload: agent.Auth.login(email, password) }),
    onUnload: () =>
        dispatch({ type: LOGIN_PAGE_UNLOADED })
});

class LoginForm extends React.Component {

    constructor() {
        super();
        this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
        this.changePassword = ev => this.props.onChangePassword(ev.target.value);
        this.submitForm = (email, password) => ev => {
            ev.preventDefault();
            this.props.onSubmit(email, password);
        };
    }

    componentWillUnmount() {
        this.props.onUnload();
    }

    render() {
        const email = this.props.email;
        const password = this.props.password;
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
                      {' '}Log-in to your account
                  </Header>
                  <ListErrors errors={this.props.errors} />
                  <Form size='large' onSubmit={this.submitForm(email, password)}>
                    <Segment stacked>
                      <Form.Input
                          fluid
                          icon='mail'
                          iconPosition='left'
                          placeholder='E-mail address'
                          value={email}
                          onChange={this.changeEmail}
                      />
                      <Form.Input
                          fluid
                          icon='lock'
                          iconPosition='left'
                          placeholder='Password'
                          type='password'
                          value={password}
                          onChange={this.changePassword}
                      />

                      <Button color='teal' type="submit" fluid size='large'  loading={this.props.inProgress}>Login</Button>
                    </Segment>
                  </Form>
                  <Message>
                    New to us? <Link to="/register">Sign Up</Link>
                  </Message>
                </Grid.Column>
              </Grid>
            </div>
            </Container>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
