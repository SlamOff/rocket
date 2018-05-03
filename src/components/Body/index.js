import React, {Component} from 'react';
import './style.css';
import Pagination from '../Pagination';
import {store} from '../Pagination';

export default class Body extends Component {
    constructor(props){
        super(props);
        this.state = {
            offset: 0,
            launches: [],
            items: 10,
            isHovered: false,
            clickedPage: null
        };
        this.offset = 0;
        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
    }
    // changeOffset(){
    //
    // }
    changeOpacity = (target) => {
        if(!target.classList.contains('rocket__item__desc')){
            target.closest('.rocket__item__desc').style.opacity = this.state.isHovered ? 0 : 1;
        }
        else {
            target.style.opacity = this.state.isHovered ? 0 : 1;
        }
    };
    getItems(offset){
        let xhr = new XMLHttpRequest();

        store.subscribe(() => {
            let page = +store.getState()[store.getState().length - 1];
            this.offset = page;
            console.log('page clicked: ', page);
            console.log(this);
        });

        let url = 'https://launchlibrary.net/1.3/launch/next/' + this.state.items + '?offset=' + offset;
        console.log(url);
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
    mouseEnter(e){
        this.setState({isHovered: true});
        this.changeOpacity(e.target);
    };
    mouseLeave(e){
        this.setState({isHovered: false});
        this.changeOpacity(e.target);
    };

    componentDidMount(){
        this.getItems(this.offset);
    };
    render(){
        const { launches } = this.state;
        return (
            <div className="wrapper">
                <ul className="rocket__list">
                    {
                        launches.map((el) => {
                            return (
                                <li className="rocket__item" key={el.id}>
                                    <h6 className="rocket__item__title">{el.name}</h6>
                                    <div className="rocket__item__wrapper" onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
                                        <div className="rocket__item__desc">
                                            <div className="rocket__item__desc_inner">
                                                <p>Location: {el.location.name}</p>
                                                <p>Description: {el.missions.length > 0 ? el.missions[0].description : 'No description'}</p>
                                                <p className="wiki"><a href={el.rocket.wikiURL}>See on Wikipedia</a></p>
                                            </div>
                                        </div>
                                        <img className="rocket__item__pict" src={el.rocket.imageURL} alt=""/>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
                <ul className="pagination">
                    <Pagination />
                </ul>
            </div>
        )
    }
}