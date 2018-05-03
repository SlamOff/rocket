import React, {Component} from 'react';
import './style.css';

export default class Footer extends Component {
    render(){
        return (
            <footer className="footer">
                    <div className="header__logo">
                        <a href="/"><img src="img/logo.png" alt=""/></a>
                    </div>
            </footer>
        )
    }
}