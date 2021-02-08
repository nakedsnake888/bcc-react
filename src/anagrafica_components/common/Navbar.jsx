import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from './Constants';

class Navbar extends Component {
  state = {};

  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <div className="w-100 order-1 order-md-0">
          <ul className="navbar-nav mr-auto">
            <Link
              className={`nav-link  navButton ${false ? 'active' : ''}`}
              to={window.defConfigurations.url_prefix + ROUTES.RICERCA_CLIENTI}
            >
              Ricerca Cliente
            </Link>
            <Link
              className={`nav-link  navButton ${false ? 'active' : ''}`}
              to={window.defConfigurations.url_prefix + ROUTES.REPORT}
            >
              Report
            </Link>
            <Link
              className={`nav-link  navButton ${false ? 'active' : ''}`}
              to={window.defConfigurations.url_prefix + 'ordine'}
            >
              Ordine
            </Link>
          </ul>
        </div>
        <div className="ml-autoorder-0">
          <div>
            <div className="navbar-brand text-center">
              {this.props.username
                ? this.props.username
                : localStorage.getItem('USERNAME')}
              <i
                className="fa fa-sign-out pl-2"
                aria-hidden="true"
                onClick={() => this.props.logout()}
              ></i>
            </div>
          </div>
        </div>
        {/*
            <button className="btn btn-danger col-md-1 offset-md-6">
              LOGOUT
            </button> */}
      </nav>
    );
  }
}

export default Navbar;
