import { Link } from 'react-router-dom';
import * as auth from '../utils/auth.js';
import { useState } from 'react';

function Register({ setCurrentEmail, handleInfoTooltipOpen, handleInfoTooltipType }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault()
        auth.register(email, password)
            .then(res => {
                if (res) {
                    handleInfoTooltipType(true);
                    handleInfoTooltipOpen();
                } else {
                    handleInfoTooltipType(false);
                    handleInfoTooltipOpen();
                }
            });
    }

    return (
        <div className='register'>
            <h1 className='register__title'>Регистрация</h1>
            <form name='register' className='register__form' onSubmit={handleSubmit} noValidate>
                <input type='email' name='email' placeholder='E-mail'
                    className='register__input' value={email} onChange={handleChangeEmail} required />
                <input type='password' name='password' placeholder='Пароль'
                    className='register__input' value={password} onChange={handleChangePassword} required />
                <button type='submit' className='register__submit-button'>Зарегестрироваться</button>
            </form>
            <p className='register__option-text'>Уже зарегестрированы? <Link className='register__option-link' to='/react-mesto-auth/sign-in'>Войти</Link></p>
        </div>
    )
}

export default Register;