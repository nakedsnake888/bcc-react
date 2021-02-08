import React, { Component } from 'react';
import _ from 'lodash';
import ClientiForm from './clientiForm';
import ClientiTable from './clientiTable';
import DettaglioCliente from './DettaglioCliente';
import Pagination from './common/Pagination';
import { paginate } from '../utils/paginate';
import { Container, Row, Col } from 'react-bootstrap';

class RicercaClienti extends Component {
  //Inizializzo stato
  state = {
    show: false,
    searched: false,
    clienti: {},
    cliente: {},
    page: 1,
    pageSize: 4,
  };

  //Funzione per prelevare i clienti atrraverso il submit della form.
  updateClienti = (clienti) => {
    this.setState({ clienti, searched: true });
  };

  //Funzione per selezionare il cliente
  setItem = (cliente) => {
    this.setState({ cliente, show: true });
  };

  //Funzione che chiude il Modale
  hideModal = () => {
    this.setState({ show: false });
  };

  //Funzione per cambiare la pagina
  cambiaPagina = (page) => {
    this.setState({ page });
  };

  //Funzione per paginare i dati.
  filteredData = () => {
    const { clienti, page, pageSize } = this.state;
    return paginate(clienti, page, pageSize);
  };

  //Funzione per renderizzare nulla, testo o tabella.
  showBottom = () => {
    const { clienti, searched } = this.state;
    const pagedData = this.filteredData();

    return _.isEmpty(clienti) ? (
      searched ? (
        <p>Nessuna Corrispondenza trovata.</p>
      ) : (
        ''
      )
    ) : (
      <div>
        <Row>
          <Col>
            <ClientiTable data={pagedData} setItem={this.setItem} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Pagination
              itemsCount={clienti.length}
              pageSize={this.state.pageSize}
              currentPage={this.state.page}
              onPageChange={this.cambiaPagina}
            />
          </Col>
        </Row>
      </div>
    );
  };

  //funzione per aggiornare cliente
  aggiornaCliente = () => {
    const cliente = this.state.cliente;
    cliente.confermato = true;
    this.setState({ cliente });
  };
  render() {
    const { cliente, show } = this.state;

    return (
      <Container fluid>
        <br />
        <Row>
          <Col>
            <h1>Ricerca Clienti</h1>
            <br />
          </Col>
        </Row>
        <Row>
          <Col>
            <ClientiForm updateClienti={this.updateClienti} />
          </Col>
        </Row>
        <small id="emailHelp" className="form-text text-muted">
          I campi contrassegnati da * sono obbligatori.
        </small>
        <br />
        {this.showBottom()}
        <DettaglioCliente
          show={show}
          cliente={cliente}
          aggiornaCliente={this.aggiornaCliente}
          onHide={this.hideModal}
        />
      </Container>
    );
  }
}

export default RicercaClienti;
