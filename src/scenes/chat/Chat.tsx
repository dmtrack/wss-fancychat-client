import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LoginParams } from '../../interfaces/chat.interface';
import socket from '../../utils/socket';

const Chat = () => {
    const { search } = useLocation();
    const [params, setParams] = useState<LoginParams>();

    useEffect(() => {
        const searchParams: LoginParams = Object.fromEntries(
            new URLSearchParams(search)
        );
        setParams(searchParams);
        socket.emit('join', searchParams);
    }, [search]);

    return <div>Chat</div>;
};

export default Chat;
