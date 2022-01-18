import * as auth from '../utils/auth.js';
import { useState } from 'react';

function Login({ handleLogin, setCurrentEmail, handleInfoTooltipOpen, handleInfoTooltipType }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!email || !password) {
            return;
        }
        auth.signin(email, password)
            .then((data) => {
                if (data) {
                    setCurrentEmail(email);
                    setEmail('');
                    setPassword('');
                    handleLogin();
                } else {
                    handleInfoTooltipType(false);
                    handleInfoTooltipOpen();
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='register'>
            <h1 className='register__title'>Войти</h1>
            <form name='login' className='register__form' onSubmit={handleSubmit} noValidate>
                <input type='email' name='email' placeholder='E-mail'
                    className='register__input' value={email} onChange={handleChangeEmail} required />
                <input type='password' name='password' placeholder='Пароль'
                    className='register__input' value={password} onChange={handleChangePassword} required />
                <button type='submit' className='register__submit-button'>Войти</button>
            </form>
        </div>
    )
}

export default Login;