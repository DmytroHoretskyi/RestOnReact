import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {UsersScreen} from "./screens/UsersScreen";
import {PostsScreen} from "./screens/PostsScreen";
import {DetailsScreen} from "./screens/DetailsScreen";
import {AddScreen} from "./screens/AddScreen";
import {EditScreen} from "./screens/EditScreen";

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/posts/:id" component={PostsScreen}/>
                    <Route path="/details/post/:id" component={DetailsScreen}/>
                    <Route path="/add-post/:id" component={AddScreen}/>
                    <Route path="/edit-post/:id" component={EditScreen}/>
                    <Route path="/" component={UsersScreen}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
