import React from 'react';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import AppBar from 'material-ui/AppBar';
import TitleBar from './TitleBar.js';
import FetchData from './FetchData.js';
import GetInfo from './TextInput.js';
import { withStyles } from 'material-ui/styles';


const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
}

class App extends React.Component {
    // One thing every component must do:
    // define the render method
    // (this defines the view of the component)
    render() {
        return (
            <div>
                <TitleBar />
                <GetInfo />
            </div>
    );
    }
}

export default App;