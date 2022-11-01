import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import './Main.css';

import api from "../services/api";

import likes from '../assets/likes.png';
import dislikes from '../assets/dislikes.png';

export default function Main() {
    const { id } = useParams();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function loadUsers() {
            const response = await api.get('/devs', {
                headers: {
                    user: id,
                }
            })

            setUsers(response.data);
        }

        loadUsers();
    }, [id]);

    useEffect(() => {
        const socket = io('http://localhost:3333');
    }, [id]);

    async function handleLike(idUser) {
        await api.post(`/devs/${idUser}/likes`, null, {
            headers: { user: id }
        });

        setUsers(users.filter(user => user._id !== idUser));
    }

    async function handleDislike(idUser) {
        await api.post(`/devs/${idUser}/dislikes`, null, {
            headers: { user: id }
        });

        setUsers(users.filter(user => user._id !== idUser));
    }

    return (
        <div className="main-container">
            <Link to="/">
                <h1 className='logo'>Tindev</h1>
            </Link>

            {users.length > 0 ? (
                <ul>
                    {users.map(user => (
                        <li key={user._id}>
                            <img src={user.avatar} alt={user.name} />
                            <footer>
                                <strong>{user.name}</strong>
                                <p>{user.bio}</p>
                            </footer>

                            <div className="buttons">
                                <button type="button" onClick={() => handleDislike(user._id)}>
                                    <img src={dislikes} alt="Dislike" />
                                </button>

                                <button type="button" onClick={() => handleLike(user._id)}>
                                    <img src={likes} alt="Dislike" />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="empty">Acabou :(</div>
            )}
        </div>
    )
}