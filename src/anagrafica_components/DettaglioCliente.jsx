import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import { postClienteModified } from '../services/clientiService';

import 'react-toastify/dist/ReactToastify.css';

class DettaglioCliente extends Component {
  //Colonne per snellire metodo render.
  columns = [
    {
      label: 'Nome',
      path: 'nome',
    },
    {
      label: 'Nag',
      path: 'nag',
    },
    {
      label: 'Data di Nascita',
      path: 'dataNascita',
    },
  ];

  //Caselle da renderizzare.
  checks = [
    {
      label: 'Numero di telefono',
      path: 'telefono',
      content: false,
    },
    {
      label: 'Email',
      path: 'email',
      content: false,
    },
    {
      label: 'P1',
      path: 'p1',
      content: true,
    },
    {
      label: 'P2',
      path: 'p2',
      content: true,
    },
    {
      label: 'P3',
      path: 'p3',
      content: true,
    },
    {
      label: 'P4',
      path: 'p4',
      content: true,
    },
    {
      label: 'P5',
      path: 'p5',
      content: true,
    },
    {
      label: 'P6',
      path: 'p6',
      content: true,
    },

    {
      label: 'Firma',
      path: 'firma',
      content: true,
    },
  ];

  state = { cliente: {}, show: true, conferma: false };

  componentDidMount() {
    this.createFields();
    if (this.props.cliente.confermato) {
      this.setState({ approved: true, conferma: false });
    }
  }

  //crea campi cliente
  createFields = () => {
    const cliente = this.state.cliente;
    this.checks.map((check) => (cliente[check.path] = false));
    this.setState({ cliente });
  };

  //Funzione onChange
  onChange = (evt, path) => {
    if (this.state.conferma !== true) {
      const cliente = { ...this.state.cliente };
      cliente[path] = evt.target.checked;
      this.setState({ cliente });
    }
  };

  //funzione per renderizzare le checkBox.
  renderCheck = (cliente, check) => {
    return (
      <tr key={check.path}>
        <td style={{ textAlign: 'start' }}>{check.label}</td>
        <td style={{ textAlign: 'center' }}>
          {!check.content ? (
            this.props.cliente[check.path]
          ) : (
            <i
              className={
                this.props.cliente[check.path] ? 'fa fa-check' : 'fa fa-times'
              }
              aria-hidden="true"
            ></i>
          )}
        </td>
        <td style={{ textAlign: 'end' }}>
          <input
            className="form-check-input pull-right"
            type="checkbox"
            checked={this.state.cliente[check.path]}
            id={'id-' + check.path}
            onChange={(e) => this.onChange(e, check.path)}
          ></input>
        </td>
      </tr>
    );
  };

  //Funzione per renderizzare i campi voluti dinamicamente.
  renderContent = (cliente, column) => {
    return (
      <tr key={column.path}>
        <td style={{ textAlign: 'start' }}>{column.label}</td>
        <td style={{ textAlign: 'center' }}>{cliente[column.path]}</td>
      </tr>
    );
  };

  //Funzione per renderizzare il form
  renderForm = (cliente, columns, checks) => {
    return (
      <div>
        <Container fluid>
          <table className="table table-borderless">
            <thead>
              <tr>
                <th style={{ textAlign: 'start' }} scope="col">
                  Campo
                </th>
                <th style={{ textAlign: 'center' }} scope="col">
                  Valore
                </th>
                <th style={{ textAlign: 'end' }} scope="col">
                  Modificato
                </th>
              </tr>
            </thead>
            <tbody>
              {this.columns.map((column) =>
                this.renderContent(this.props.cliente, column)
              )}
              {this.checks.map((check) => this.renderCheck(cliente, check))}
            </tbody>
          </table>
        </Container>
      </div>
    );
  };

  //Funzione per mandare richiesta di modifica.
  async prova(cliente, stato) {
    const data = { ...stato };
    data.id = cliente.id;
    const { data: res } = await postClienteModified(data);
    if (res === 'OK') {
      this.props.aggiornaCliente();
    }
    this.setState({ approved: true });
  }

  //Notifica conferma
  async notifyConferma() {
    if (this.state.conferma === true) {
      await this.prova(this.props.cliente, this.state.cliente);
    }
    const conferma = !this.state.conferma;
    this.setState({ conferma });
  }

  //Funzione per chiudere.
  handleClose = () => {
    this.createFields();
    this.setState({ approved: false, conferma: false });
  };

  //Funzione per renderizzare il Footer.
  renderFooter = () => {
    const { cliente, onHide } = this.props;
    return (
      <Modal.Footer>
        {cliente.confermato ? (
          <div>
            <Button
              variant="primary"
              onClick={() => onHide()}
              style={{ transition: 'none' }}
            >
              Chiudi
            </Button>
          </div>
        ) : (
          <div
            className={
              this.state.conferma
                ? 'alert alert-warning'
                : 'alert alert alert-light'
            }
            role="alert"
          >
            {this.state.conferma ? 'Sicuro di voler salvare?' : ''}
            <Button
              variant={this.state.conferma ? 'primary mx-2' : 'warning mx-2'}
              onClick={() => this.notifyConferma()}
            >
              Salva
            </Button>
            <Button
              variant="secondary mx-2"
              onClick={() => onHide()}
              style={{ transition: 'none' }}
            >
              Chiudi
            </Button>
          </div>
        )}
      </Modal.Footer>
    );
  };

  render() {
    const { cliente: campiCliente } = this.state;
    const { cliente, show, onHide } = this.props;
    return (
      <div>
        <Modal
          centered
          size={cliente.confermato ? 'md' : 'lg'}
          show={show}
          onExited={() => this.handleClose()}
          onHide={() => onHide()}
        >
          <Modal.Header closeButton>
            <Modal.Title>{cliente.nome}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {cliente.confermato
              ? 'Il tuo codice cliente è: ' + cliente.codice
              : this.renderForm(campiCliente, this.columns, this.checks)}
          </Modal.Body>
          {this.renderFooter()}
        </Modal>
      </div>
    );
  }
}

export default DettaglioCliente;
