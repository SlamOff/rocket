import React, {Component} from 'react';
import './style.css';

export default class Header extends Component {
    render(){
        return (
            <header className="header">
                    <div className="header__logo">
                        <a href="/"><img src="img/logo.png" alt=""/></a>
                    </div>
            </header>
        )
    }
}