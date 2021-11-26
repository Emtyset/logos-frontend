import React from "react";
import './Header.css';
import userIcon from './user.svg'

function Header(){
    return (
        <header className='header'>
            <h1 className='logo'>λόγος</h1>
            <nav className='header-list'>
                <a href="#">Обучение</a>
                <a href="#">База заданий</a>
                <a href="#">Справка</a>
            </nav>
            <img className='user-icon' src={userIcon} alt='user'></img>
        </header>
    )
}

export default Header;