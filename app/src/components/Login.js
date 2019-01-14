import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import './Login.scss';

function Login() {
    const [isLogin, setLogin] = useState(true);

    const register = function() {
        setLogin(false);
    }

    const login = function() {
        setLogin(true);
    }

    return (
        <div className='login-wrapper'>
            <Form>
                <h1>Login</h1>
                <Form.Field>
                    <input placeholder='Email' />
                </Form.Field>
                <Form.Field>
                    <input type='password' placeholder="Password" />
                </Form.Field>
                {isLogin && <Button>Login</Button>}
                {!isLogin && <Button>Register</Button>}
                {isLogin && <div className="login-link-container"><span className="clickable underline" onClick={register}>Register</span></div>}
                {!isLogin && <div  className="login-link-container"><span className="clickable underline" onClick={login}>Login</span></div>}
            </Form>
        </div>
    );
}

export default Login;
