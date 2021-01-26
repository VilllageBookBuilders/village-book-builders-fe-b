import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import '../style.css';
// import PrivateRoute from "../utils/PrivateRoute";
import { checkToken } from '../state/actions/index';
import Login from './pages/Login/Login';
import Logout from './Logout';
import HeadmasterDashboard from './pages/Headmaster/HeadmasterDashboard';
import TeacherDashboard from './pages/Teacher/TeacherDashboard';
import TeacherProfile from './pages/Teacher/TeacherProfile/TeacherProfile';
import TeacherProfileForm from './pages/Teacher/TeacherProfile/TeacherProfileForm';
import AdminDashboard from './pages/Admin/AdminDashboard';
import ProgramDashboard from './pages/Program/ProgramDashboard';

const App = ({ role, checkToken }) => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/teacher/:id/edit" component={TeacherProfileForm} />
        <Route exact path="/teacher/:id" component={TeacherProfile} />
        <Route path="/logout" component={Logout} />
        <Route path="/login" component={Login} />

        <Route path="/">
          {/*//! this needs to be changed to if there is an unexpired token*/}
          {/* Look for token in case a user refreshes the page & clears redux store, then it repopulates the redux store with userId, role & loggedIn status with checkToken().  */}
          {localStorage.getItem('token') ? (
            <>
              {checkToken()}
              {/* //once we make a reusable dashboard/sidebar, this is where we would put it, passing in the role as props to fill it out accordingly. */}
              {role === 'headmaster' && <HeadmasterDashboard />}
              {role === 'admin' && <AdminDashboard />}
              {role === 'program' && <ProgramDashboard />}
              {role === 'teacher' && <TeacherDashboard />}
            </>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
      </Switch>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    // loggedIn: state.authReducer.loggedIn,
    // userId: state.authReducer.userId,
    role: state.authReducer.role,
  };
};

export default connect(mapStateToProps, { checkToken })(App);
