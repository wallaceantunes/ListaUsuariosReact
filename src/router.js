import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from './ui/screens/loginScreen/Login';
import List from './ui/screens/listScreen/List';
import Create from './ui/screens/createScreen/Create';
import Edit from './ui/screens/editScreen/Edit';
import PrivateRoute from './ui/components/privateRoute';

export class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={Login} />
                <PrivateRoute>
                    <Route path='/lista' component={List} />
                    <Route path='/cadastrar' component={Create} />
                    <Route path='/editar' component={Edit} />
                </PrivateRoute>
            </Switch>
        )
    }
};

export default Routes;