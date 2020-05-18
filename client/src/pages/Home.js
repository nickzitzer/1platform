import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';


class Home extends Component {
    render() {
        return (
            <div className="App">
                <h1>Project Home</h1>
                {/* Link to List.js */}
                    <Button variant="contained" color="primary" href={'./list'}>
                        My List
                    </Button>
            </div>
        );
    }
}
export default Home;
