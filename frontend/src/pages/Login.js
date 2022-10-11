import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

import api from '../services/api';

export default function Login() {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        
        const response = await api.post('/devs', {
            username
        });

        const { _id } = response.data;
        
        navigate(`/dev/${_id}`);
    }

    return (
        <div className='login-container'>
            <form onSubmit={handleSubmit}>
                <h1 className='logo'>Tindev</h1>

                <input 
                placeholder='Digite seu usuário no Github' 
                value={username}
                onChange={e => setUsername(e.target.value)}
                />
                <button type='submit'>Entrar</button>
            </form>
        </div>
    );
}