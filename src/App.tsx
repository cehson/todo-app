import React from 'react';
import Dashboard from './modules/layout/dashboard/index'
import Navigation from './modules/layout/navigation/index'
import TodoDetails from './modules/layout/todo-details/index'
import SignIn from './modules/layout/auth/signIn/index'
import CreateTodo from './modules/layout/create-todo/index'
import SignUp from './modules/layout/auth/signUp'
import { BrowserRouter, Switch, Route, Redirect, useHistory } from 'react-router-dom'
import './App.scss'
import './assets/styles/style.scss'


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/todo/:id" component={TodoDetails} />
        <Route path="/signin/" component={SignIn} />
        <Route path="/signup/" component={SignUp} />
        <Route path="/create/" component={CreateTodo} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
