import React from 'react';
import './Login.css';

export default function Login() {
    return (
        <div className='login-container'>
            <form action='#' method=''>
                <h1 className='logo'>Tindev</h1>
                
                <input placeholder='Digite seu usuário no Github' />
                <button type='submit'>Entrar</button>
            </form>
        </div>
    );
}