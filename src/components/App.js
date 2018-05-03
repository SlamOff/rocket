import React, {Component} from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import './App.css';


class App extends Component{
    render(){
        console.log(this.props.store);
        //console.log(store);
        return (
            <div className="container">
                <Header />
                <Body />
                <Footer />
            </div>
        )
    }
}
// export default App;
export default connect(
    state => ({
        store: state
    }),
    dispatch => ({})
)(App);