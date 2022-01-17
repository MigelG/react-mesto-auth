import logo from '../images/logo/logo.svg';
import { Link, Route, Routes } from 'react-router-dom';

function Header({ type, email, handleQuit }) {

    return (
        <header className="header">
            <img src={logo} alt="Логотип" className="header__logo" />
            <Routes>
                <Route path='/react-mesto-auth' element={
                    <div>
                        <span className='header__email'>{email}</span>
                        <Link className='header__link' to="/react-mesto-auth/sign-in" onClick={handleQuit}>Выйти</Link>
                    </div>
                } />
                <Route path='/react-mesto-auth/sign-in' element={
                    <Link className='header__link' to="/react-mesto-auth/sign-up">Регистрация</Link>
                } />
                <Route path='/react-mesto-auth/sign-up' element={
                    <Link className='header__link' to="/react-mesto-auth/sign-in">Войти</Link>
                } />
            </Routes>
        </header>
    );
}

export default Header;