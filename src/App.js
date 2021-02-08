import React, { Component } from 'react';
import './App.css';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login } from './anagrafica_components/Login';
import { USER_TYPE, ROUTES } from './anagrafica_components/common/Constants';
import axios from 'axios';
import config from './config.json';
import dotenv from 'dotenv';
import Navbar from './anagrafica_components/common/Navbar';
import RicercaClienti from './anagrafica_components/RicercaClienti';
import DettaglioCliente from './anagrafica_components/DettaglioCliente';
import MascheraOrdine from './anagrafica_components/MascheraOrdine';

dotenv.config();

class App extends Component {
  state = {
    userType: null,
    username: '',
  };

  UNSAFE_componentWillMount() {
    //this if handle an eventual modification of URL from the user and redirect it to the login
    if (
      this.props.location.pathname === '/' ||
      this.props.location.pathname === '' ||
      this.props.location.pathname === window.defConfigurations.url_prefix
    ) {
      localStorage.removeItem('TOKEN');
      this.props.history.replace(
        window.defConfigurations.url_prefix + ROUTES.LOGIN
      );
    }

    for (let api in config) {
      config[api] = config[api].replace(
        '[REACT_APP_URL_JAVA]',
        window.defConfigurations.REACT_APP_URL_JAVA
      );
    }
  }

  handleLogin = (loginRequest) => {
    const headers = { 'Content-Type': 'application/json' };
    const conf = { headers: { ...headers } };

    let roles = [];

    axios
      .post(config.apiLoginEndpoint, loginRequest, conf)
      .then((response) => {
        roles = [...response.data.roles];
        //saving token and username in local storage to persist data for the session
        localStorage.setItem('TOKEN', response.data.accessToken);
        localStorage.setItem('USERNAME', response.data.username);

        this.setState({
          roles: roles,
          username: response.data.username,
          userType:
            roles.length === 1 && roles[0].authority === USER_TYPE.USER
              ? USER_TYPE.USER
              : USER_TYPE.ADMINISTRATOR,
        });
        //checking if the user logged is a simple user or an admin
        if (roles.length === 1 && roles[0].authority === USER_TYPE.USER) {
          this.props.history.replace(
            window.defConfigurations.url_prefix + ROUTES.RICERCA_CLIENTI
          );
        } else {
          this.props.history.replace(
            window.defConfigurations.url_prefix + ROUTES.IMPORTA_CLIENTI
          );
        }
      })
      .catch((err) => console.log(err.response));
  };

  handleLogout() {
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('USERNAME');
    this.setState({ userType: null, username: '' });
    this.props.history.replace(
      window.defConfigurations.url_prefix + ROUTES.LOGIN
    );
  }

  render() {
    const { userType, username } = this.state;

    //Per debug.
    //const username = localStorage.getItem("USERNAME");
    //const userType = username === "admin" ? "ROLE_ADMIN" : "ROLE_USER";

    return (
      <div className="App">
        {userType && <Navbar logout={() => this.handleLogout()} />}
        <Switch>
          <Route
            path={window.defConfigurations.url_prefix + 'ordine'}
            render={(props) => <MascheraOrdine {...props} />}
          />
          <Route
            path={
              window.defConfigurations.url_prefix +
              ROUTES.RICERCA_CLIENTI +
              ':id'
            }
            render={(props) => <DettaglioCliente {...props} />}
          />
          <Route
            path={window.defConfigurations.url_prefix + ROUTES.RICERCA_CLIENTI}
            render={(props) => <RicercaClienti {...props} />}
          />
          <Route
            path={window.defConfigurations.url_prefix + ROUTES.LOGIN}
            exact
            render={(props) => (
              <Login {...props} handleLogin={this.handleLogin} />
            )}
          />
          {
            <Redirect
              from="/login"
              to={
                userType === USER_TYPE.USER && username !== ''
                  ? window.defConfigurations.url_prefix + 'ricerca-clienti'
                  : username !== ''
                  ? window.defConfigurations.url_prefix + 'importa-clienti'
                  : window.defConfigurations.url_prefix + 'login'
              }
            />
          }
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
