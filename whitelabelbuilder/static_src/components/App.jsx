import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Header from './Header';
import AddTask from './AddTask';
import {Redirect} from 'react-router';
import TaskList from "./TaskList";

export class App extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => <Redirect to="/build"/>}
                    />
                    <Route
                        exact
                        path="/build/"
                        component={() => (
                            <div>
                                <TaskList/>
                                <AddTask/>
                            </div>
                        )
                        }
                    />
                </Switch>
            </div>
        );
    }
}

export default App;
