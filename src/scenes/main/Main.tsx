import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import main from '../../styles/main.module.css';

interface IEnterRoom {
    name: string;
    room: string;
}

const Main = () => {
    const [values, setValues] = useState<IEnterRoom>({
        name: '',
        room: '',
    });

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.currentTarget.name]: e.currentTarget.value });
    };

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        const isDisabled = Object.values(values).some(
            (value: string) => !value
        );
        if (isDisabled) e.preventDefault();
    };
    return (
        <>
            (
            <div className={main.wrap}>
                <div className={main.container}>
                    <h1 className={main.heading}>Join</h1>
                    <form className={main.form}>
                        {' '}
                        <div className={main.group}>
                            <input
                                placeholder='username'
                                type='text'
                                name='name'
                                value={values.name}
                                className={main.input}
                                autoComplete='off'
                                onChange={handleChange}
                            />
                        </div>
                        <div className={main.group}>
                            <input
                                placeholder='room'
                                type='text'
                                name='room'
                                value={values.room}
                                className={main.input}
                                onChange={handleChange}
                                autoComplete='off'
                                required
                            />
                        </div>
                        <Link
                            onClick={handleClick}
                            className={main.group}
                            to={`/chat/?name=${values.name}&room=${values.room}`}>
                            <button type='submit' className={main.button}>
                                Sign in
                            </button>
                        </Link>
                    </form>
                </div>
                )
            </div>
        </>
    );
};

export default Main;
