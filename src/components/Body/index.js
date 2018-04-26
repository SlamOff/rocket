import React, {Component} from 'react';
import './style.css';

export default class Body extends Component {
    constructor(){
        super();
        this.state = {
            offset: 0,
            launches: []
        };
    }

    componentDidMount(){
        let xhr = new XMLHttpRequest();
        let url = 'https://launchlibrary.net/1.3/launch/next/10?offset=' + this.state.offset;
        xhr.open('GET', url, true);
        xhr.send();
        xhr.onreadystatechange = function() {
            if (xhr.readyState !== 4) return;
            if (xhr.status !== 200) {
                console.error('Error. No data received');
            }
            else {
                this.setState({
                    launches: JSON.parse(xhr.responseText).launches
                });
            }
        }.bind(this);
    };
    render(){
        const { launches } = this.state;
        console.log(launches);
        return (
            <ul className="rocket__list">
                {
                    launches.map((el) => {
                        return (
                            <li className="rocket__item" key={el.id}>
                                <h6 className="rocket__item__title">{el.name}</h6><br/>
                                <img className="rocket__item__pict" src={el.rocket.imageURL} alt=""/>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }
}