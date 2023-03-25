import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LoginParams } from '../../interfaces/chat.interface';
import socket from '../../utils/socket';

const Chat = () => {
    const { search } = useLocation();
    const [params, setParams] = useState<LoginParams>();
    const [state, setState] = useState<string[]>([]);

    useEffect(() => {
        const searchParams: LoginParams = Object.fromEntries(
            new URLSearchParams(search)
        );
        setParams(searchParams);
        socket.emit('join', searchParams);
    }, [search]);

    useEffect(() => {
        socket.on('message', ({ data }) => {
            setState((_state) => ({ ..._state, data }));
        });
    }, []);
    console.log(state);

    return <div>Chat</div>;
};

export default Chat;
