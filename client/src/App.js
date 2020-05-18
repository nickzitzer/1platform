import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import List from './pages/List';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

class App extends Component {
    render() {
        const App = () => (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6">
                            News
                        </Typography>
                        <Button color="inherit" href={'./list'}>List</Button>
                    </Toolbar>
                </AppBar>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/list' component={List}/>
                </Switch>
            </div>
        )
        return (
            <Switch>
                <App/>
            </Switch>
        );
    }
}

export default App;
