import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import { postOrdine } from './../services/ordiniService';
import Joi from 'joi-browser';

class DettaglioOrdine extends Component {
  //State
  state = {
    cliente: '',
    res: '',
    error: null,
    conferma: false,
  };

  //Pulisci modale
  clean() {
    if (this.state.res) this.props.clean();
    this.setState({
      cliente: '',
      res: '',
      error: null,
      conferma: false,
    });
  }

  //Funzione per validare
  validate = () => {
    const { error } = Joi.string()
      .required()
      .min(5)
      .label('Cliente')
      .validate(this.state.cliente);
    if (error) return error.details[0].message;
    return null;
  };

  //Funzione per renderizzare il riepilogo dell'ordine.
  renderRiepilogo(res) {
    return (
      <div>
        Complimenti {res.cliente}, hai completato l'ordine.
        <br />
        Il tuo ordine ha id #{res.id}.
        <br />
        Gli Articoli da te acquistati sono:
        {this.renderTable(res.dettaglioOrdini)}
      </div>
    );
  }

  //Funzione per renderizzare la tabella
  renderTable(carrello) {
    const { costo } = this.props;

    return (
      <div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Articolo</th>
              <th>Quantità</th>
              <th>Prezzo</th>
            </tr>
          </thead>
          <tbody>
            {carrello.map((el) => (
              <tr key={el.articolo.id}>
                <td>{el.articolo.nome}</td>
                <td>{el.quantita}</td>
                <td>&euro; {el.articolo.prezzo}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p style={{ textAlign: 'center' }}>Il costo è di {costo()} euro.</p>
      </div>
    );
  }

  //Funzione per renderizzare form e tabella.
  renderFormTable(carrello) {
    const { error } = this.state;

    return (
      <div className="row">
        <div className="col">
          <form>
            <div className="form-group">
              <label htmlFor="Nome">Nome</label>
              <input
                className="form-control"
                type="text"
                value={this.state.cliente}
                onChange={(e) => this.aggiornaCliente(e)}
              />
              {error && <div className="alert alert-danger">{error}</div>}
            </div>
          </form>
        </div>
        <div className="col">{this.renderTable(carrello)}.</div>
      </div>
    );
  }

  //Funzione per aggiornare il campo cliente:
  aggiornaCliente(e) {
    this.setState({ cliente: e.target.value, error: this.validate() });
  }

  //Funzione per creare un oggetto per la post.
  creaOggetto(carrello) {
    const ogg = carrello.map(function (el) {
      return { idArticolo: el.articolo.id, quantita: el.quantita };
    });
    return ogg;
  }

  //Funzione per effettuare la POST dell'ordine.
  async creaOrdine(carrello) {
    const { error } = () => this.validate();
    if (error) {
      this.setState({ error });
      return;
    }
    const { conferma } = this.state;
    if (!conferma) {
      this.setState({ conferma: true });
      return;
    }
    const richiesteArticolo = this.creaOggetto(carrello);
    const data = {
      ordine: { cliente: this.state.cliente, data: Date.now() },
      richiesteArticolo,
    };
    const { data: res } = await postOrdine(data);
    this.setState({ res, conferma: false });
  }

  render() {
    const { show, handleShow, carrello } = this.props;
    const { res, error, cliente, conferma } = this.state;

    return (
      <Modal show={show} centered size="lg" onExited={() => this.clean()}>
        <Modal.Header>Dati Ordine</Modal.Header>
        <Modal.Body>
          {res ? this.renderRiepilogo(res) : this.renderFormTable(carrello)}
        </Modal.Body>
        <Modal.Footer>
          <div
            className={conferma ? 'alert alert-warning' : 'alert alert-light'}
            role="alert"
          >
            {conferma ? 'Sei sicuro di voler confermare?' : ''}
            <button
              className="btn btn-secondary mx-1"
              onClick={() => handleShow(false)}
            >
              Esci
            </button>
            {!res && (
              <button
                className={`btn ${
                  error || cliente === '' ? 'btn-secondary' : 'btn-primary'
                } mx-1`}
                onClick={() => this.creaOrdine(carrello)}
                disabled={error || cliente === '' ? true : false}
              >
                {!conferma ? 'Conferma ordine...' : 'Conferma'}
              </button>
            )}
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default DettaglioOrdine;
