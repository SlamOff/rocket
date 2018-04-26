import React, {Component} from 'react';
import Header from './Header';
import Body from './Body';
import './App.css';


class App extends Component{
    render(){
        return (
            <div className="container">
                <Header />
                <Body />
            </div>
        )
    }
}
export default App;