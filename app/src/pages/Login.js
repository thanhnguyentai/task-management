import React, { useState } from 'react';
import validator from 'email-validator'
import { Button, Form, Message } from 'semantic-ui-react';
import './Login.scss';
import UserService from '../service/userService';

function Login(props) {
    const [isLogin, setLogin] = useState(true);
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const register = function() {
        setError('');
        setLogin(false);
    }

    const login = function() {
        setError('');
        setLogin(true);
    }

    const onChangeName = function(event) {
        setName(event.target.value.trim());
    }

    const onChangeEmail = function(event) {
        setEmail(event.target.value.trim());
    }

    const onChangePassword = function(event){
        setPassword(event.target.value);
    }

    const onChangePassword2 = function(event) {
        setPassword2(event.target.value);
    }

    const doLogin = function() {
        if(email && validator.validate(email) && password) {
            setError('');
            UserService.login(email, password).then(data => {
                if(data.id) {
                    props.onLogin(data);
                }
            }).catch(err => {
                console.log(err.response);
            });
        } else if(!email || !validator.validate(email)) {
            setError('.please check email');
        } else {
            setError('.please check password');
        }
    }

    const doRegister = function() {
        if(name && email && validator.validate(email) && password && password2 && password === password2) {
            setError('');
        } else if(!name) {
            setError('.please check name');
        } else if(!email || !validator.validate(email)) {
            setError('.please check email');
        } else if(!password || !password2 || password !== password2) {
            setError('.please check password');
        }
    }

    return (
        <div className='login-wrapper'>
            <Form>
                {isLogin && <h1>Login</h1>}
                {!isLogin && <h1>Create an account</h1>}
                {error && <Message color='red'>{error}</Message>}
                {
                    !isLogin && 
                    <Form.Field>
                        <input type='text' placeholder="Name" value={name} onChange={onChangeName} />
                    </Form.Field>
                }
                <Form.Field>
                    <input type='email' placeholder="Email" value={email} onChange={onChangeEmail} />
                </Form.Field>
                <Form.Field>
                    <input type='password' placeholder="Password" value={password} onChange={onChangePassword} />
                </Form.Field>
                {
                    !isLogin && 
                    <Form.Field>
                        <input type='password' placeholder="Retype password" value={password2} onChange={onChangePassword2} />
                    </Form.Field>
                }
                {isLogin && <Button onClick={doLogin}>Login</Button>}
                {!isLogin && <Button onClick={doRegister}>Sign up</Button>}
                {isLogin && <div className="login-link-container"><span className="clickable underline" onClick={register}>Register</span></div>}
                {!isLogin && <div  className="login-link-container"><span className="clickable underline" onClick={login}>Login</span></div>}
            </Form>
        </div>
    );
}

export default Login;
