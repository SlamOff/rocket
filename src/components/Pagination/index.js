import React, {Component} from 'react';
import { createStore } from 'redux';
import './style.css';

const initialState = [
    0
];
function firstStore(state=initialState, action){
    if(action.type === 'page'){
        return [
            ...state,
            action.payload
        ];
    }
    return state;
}
export let store = createStore(firstStore);
console.log(store.getState());

export default class Pagination extends Component {
    constructor(props){
        super(props);
        this.paginate = this.paginate.bind(this);
        this.buildPages = this.buildPages.bind(this);
    }
    choosePage(e){
        let li = document.querySelectorAll('.pagination li');
        for (let i = 0; i < li.length; i++){
            li[i].style.color = '#000';
        }
        e.target.style.color = '#e60000';

        // this.setState({
        //     page: +e.target.textContent
        // });
        store.dispatch({
            type: 'page',
            payload: +e.target.textContent
        });
    }
    componentWillUpdate(){
        // this.setState({
        //     page: +e.target.textContent
        // });
    }
    buildPages(){
        let arr = [];
        for(let i = 0; i < 5; i++){
            arr.push(<li key={i + 1} order={i + 1} onClick={this.choosePage.bind(this)}>{i + 1}</li>);
            //arr.push(<li key={i + 1} order={i + 1} onClick={this.props.pageClick}>{i + 1}</li>);
        }
        //console.log(arr);
        return arr;
    }
    paginate(e){
        let num = +e.target.textContent;
        console.log(num);
        
        this.setState({
            offset: num * this.state.items - this.state.items
        });
        console.log(this.state);
        this.getItems();

    };
    render(){
        //const { pageClick } = this.props;
        //console.log(pageClick);
        return (
            this.buildPages()
        )
    }
}