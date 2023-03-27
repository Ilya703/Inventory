import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import signIn from './signIn';

import './authorizationForm.css';
import logo from '../../resources/img/logo.jpg';

const AuthorizationForm = ({ setToken, setSignIn}) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [redBorders, setRedBorders] = useState(false);
    const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();

        if (redBorders) window.location.reload();

        const response = await signIn(login, password);

        if (response.status === 'ok') {
            setLogin('');
            setPassword('');

            setToken(response.ws_auth.wst);
            setSignIn(true);

            navigate("/dashboard");
        } else {
            setRedBorders(true);
        }
    };

    return (
        <div className="authorizationPage">
            <img src={logo} alt={"Логотип"} className="logo"/>

            <div className="authorizationForm">
                <h1>Авторизация</h1>

                <form className="form">
                    Логин 
                    <input 
                        type="text"
                        name="login"
                        value={login}
                        className={redBorders ? 'redBorders' : ''}
                        onChange={(e) => setLogin(e.target.value)}
                    />
                    Пароль
                    <input
                        type="password"
                        name="password"
                        value={password}
                        className={redBorders ? 'redBorders' : ''}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        className="formButton"
                        onClick={(e) => submitForm(e)}
                    >
                        {redBorders ? 'Вести снова': 'Вход'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AuthorizationForm;