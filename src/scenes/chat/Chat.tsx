import React, { FormEvent, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IServiceMessage, LoginParams } from '../../interfaces/chat.interface';
import socket from '../../utils/socket';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

import styles from '../../styles/chat.module.css';
import icon from '../../images/emoji.svg';
import Messages from '../../components/Messages';

const Chat = () => {
    const { search } = useLocation();
    const [params, setParams] = useState<LoginParams>({ room: '', user: '' });
    const [state, setState] = useState<IServiceMessage[]>([]);
    const [message, setMessage] = useState<string>('');
    const [isOpen, setOpen] = useState<boolean>(false);
    const [users, setUsers] = useState<string[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        const searchParams: LoginParams = Object.fromEntries(
            new URLSearchParams(search)
        );
        setParams(searchParams);
        socket.emit('join', searchParams);
    }, [search]);

    useEffect(() => {
        socket.on('message', ({ data }) => {
            setState((_state) => [..._state, data]);
        });
    }, []);

    useEffect(() => {
        socket.on('joinRoom', ({ data }) => {
            setUsers(data.users);
        });
    }, []);

    useEffect(() => {
        return () => {
            console.log('exit');

            socket.removeAllListeners();
        };
    }, []);
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setMessage(e.currentTarget.value);
    };

    const handleLeftRoom = () => {
        socket.emit('leftRoom', { params });
        navigate('/');
    };
    console.log(users);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!message) return;
        socket.emit('sendMessage', { message, params });
        setMessage('');
    };

    const onEmojiClick = (emojiData: string) =>
        setMessage(`${message} ${emojiData}`);

    return (
        <div className={styles.wrap}>
            <div className={styles.header}>
                <div className={styles.title}>{params?.room}</div>
                <div className={styles.users}>
                    {users.length} users in this room
                </div>
                <button className={styles.left} onClick={handleLeftRoom}>
                    Left the room
                </button>
            </div>

            <div className={styles.messages}>
                <Messages messages={state} username={params.name} />
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.input}>
                    <input
                        placeholder='what do you want to say?'
                        type='text'
                        name='message'
                        value={message}
                        autoComplete='off'
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.emoji}>
                    <img src={icon} alt='' onClick={() => setOpen(!isOpen)} />
                    {isOpen && (
                        <div className={styles.emojies}>
                            <EmojiPicker
                                onEmojiClick={(
                                    emojiData: EmojiClickData,
                                    event: MouseEvent
                                ) => onEmojiClick(emojiData.emoji)}
                            />
                        </div>
                    )}
                </div>
                <div className={styles.button}>
                    <input type='submit' value='Send' />
                </div>
            </form>
        </div>
    );
};
export default Chat;
