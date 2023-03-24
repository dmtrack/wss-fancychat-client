import React from 'react';
import './styles/styles.css';
import Chat from './scenes/chat/Chat';
import Main from './scenes/main/Main';
import { Routes, Route, Link } from 'react-router-dom';
import NotFoundPage from './components/NotFoundPage';

const App: React.FC = () => {
    return (
        <div className='container'>
            <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/chat' element={<Chat />} />
                <Route path='*' element={<NotFoundPage />} />
            </Routes>
        </div>
    );
};

export default App;
