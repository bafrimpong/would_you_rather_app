import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleGetInitialAppData } from '../actions/shared';
import '../../src/utils/css/App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import SigninPage from './SigninPage';
import Dashboard from './Dashboard';
import LeaderBoard from './LeaderBoard';
import AddNewQuestion from './AddNewQuestion';
import QuestionMaster from './QuestionMaster';
import PageNotFound from './PageNotFound';
class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleGetInitialAppData())
  }

  render() {
    return (
      <BrowserRouter>
        {this.props.loading !== null ?
          (
          <Switch>
            <Route key='dashboard' exact path='/' component={Dashboard} />
            <Route key='login' path='/login' component={SigninPage} />
            <Route key='add' path='/add' component={AddNewQuestion} />
            <Route key='leaderboard' path='/leaderboard' component={LeaderBoard} />
            <Route key='question' path='/question/:id' component={QuestionMaster} />
            <Route render={() => <PageNotFound />} />
          </Switch>
          )  
          : null
        }
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ questions, authenticatedUser }) {
  return {
    loading: questions === null,
    loggedIn: authenticatedUser !== null
  }
}

export default connect(mapStateToProps)(App);
