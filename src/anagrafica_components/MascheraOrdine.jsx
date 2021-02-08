import React, { Component } from 'react';
import { paginate } from '../utils/paginate';
import ListGroup from './common/ListGroup';
import Card from './common/Card';
import Pagination from './common/Pagination';
import DettaglioOrdine from './DettaglioOrdine';
import { getArticoli } from './../services/articoliService';
import Carrello from './Carrello';

class MascheraOrdine extends Component {
  //State
  state = {
    articoli: [],
    articolo: {},
    carrello: [],
    ricerca: '',
    articoloPage: 1,
    ordinePage: 1,
    pageSize: 7,
    show: false,
  };

  //Funzione per eseguire get degli Articoli.
  async populateArticoli(stringa) {
    const { data } = await getArticoli(stringa);
    const articoli = data.sort((a, b) =>
      a.nome > b.nome ? 1 : b.nome > a.nome ? -1 : 0
    );
    this.setState({ articoli });
  }

  //Per popolare gli articoli
  componentDidMount() {
    this.populateArticoli(this.state.ricerca);
  }

  //Svuota carrello
  cleanCarrello = () => {
    this.setState({ carrello: [], ordinePage: 1 });
  };

  //Per ricercare l'articolo
  aggiornaRicerca(e) {
    this.setState({ ricerca: e.target.value });
    this.populateArticoli(e.target.value);
  }

  //Per cambiare la pagina corrente dell'articolo
  changePaginaArticolo = (page) => {
    this.setState({ articoloPage: page });
  };

  //Per cambiare la pagina corrente dell'ordine
  changePaginaordine = (page) => {
    this.setState({ ordinePage: page });
  };

  //Funzione per paginare i dati.
  filteredData = (data, currentPage, pageSize) => {
    return paginate(data, currentPage, pageSize);
  };

  //Funzione per aggiungere al carrello un articolo.
  aggiungiArticolo = (articolo) => {
    let carrello = this.state.carrello;
    carrello.push({ articolo, quantita: 1 });
    this.setState({ carrello });
  };

  //Funzione per selezionare l'articolo
  selezionaArticolo = (articolo) => {
    this.setState({ articolo });
  };

  //Funzione di reset Ricerca
  reset = () => {
    this.setState({ articolo: {}, currentPage: 1, ricerca: '' });
    this.populateArticoli('');
  };

  //Funzione per incrementare quantita articolo in un ordine.
  aumentaArticolo = (articolo) => {
    let carrello = this.state.carrello;
    const index = carrello.findIndex((el) => el.articolo.id === articolo.id);
    carrello[index].quantita++;
    this.setState({ carrello, articolo });
  };

  //Funzione per incrementare quantita articolo in un ordine.
  diminuisciArticolo = (articolo) => {
    let carrello = this.state.carrello;
    const index = carrello.findIndex((el) => el.articolo.id === articolo.id);
    carrello[index].quantita--;
    this.setState({ carrello, articolo });
  };

  //Funzione per cancellare l'articolo
  cancellaArticolo = (articolo) => {
    let carrello = this.state.carrello;
    const index = carrello.findIndex((el) => el.articolo.id === articolo.id);
    carrello.splice(index, 1);
    this.setState({ carrello, ordinePage: 1 });
  };

  //Funzione per calcolare il prezzo totale
  calcolaCosto = () => {
    let costo = 0;
    this.state.carrello.forEach(
      (el) => (costo += el.articolo.prezzo * el.quantita)
    );
    return costo;
  };

  //Funzione per aprire il Modale
  showModal = (bool) => {
    this.setState({ show: bool });
  };

  render() {
    const {
      articoli,
      articoloPage,
      ordinePage,
      pageSize,
      articolo,
      carrello,
      show,
    } = this.state;

    const articoliFiltered = this.filteredData(
      articoli,
      articoloPage,
      pageSize
    );

    const carrelloFiltered = this.filteredData(carrello, ordinePage, pageSize);

    return (
      <div className="container-fluid">
        <h1>Maschera Ordine</h1>
        <div className="row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              value={this.state.ricerca}
              onChange={(e) => this.aggiornaRicerca(e)}
              placeholder="Cerca il tuo articolo..."
            ></input>
            <br />
            <ListGroup
              articoli={articoliFiltered}
              seleziona={this.selezionaArticolo}
              selezionato={articolo}
              reset={this.reset}
            />
            <br />
            <Pagination
              itemsCount={articoli.length}
              pageSize={pageSize}
              currentPage={articoloPage}
              onPageChange={this.changePaginaArticolo}
            />
          </div>
          <div className="col-3">
            <Card
              articolo={articolo}
              carrello={carrello}
              aggiungiArticolo={this.aggiungiArticolo}
            />
          </div>
          <div className="col">
            <Carrello
              clean={this.cleanCarrello}
              carrello={carrelloFiltered}
              aumenta={this.aumentaArticolo}
              diminuisci={this.diminuisciArticolo}
              cancella={this.cancellaArticolo}
              costo={() => this.calcolaCosto()}
            />
            <br />
            <div className="row">
              <div className="col">
                <Pagination
                  itemsCount={carrello.length}
                  pageSize={2}
                  currentPage={ordinePage}
                  onPageChange={this.changePaginaordine}
                />
              </div>
              <div className="col">
                {carrello.length === 0 &&
                  'Non sono presenti Articoli nel Carrello.'}
              </div>
              <div className="col">
                <button
                  className={
                    carrello.length > 0
                      ? 'btn btn-primary pull-right'
                      : 'btn btn-secondary pull-right disabled'
                  }
                  onClick={
                    carrello.length > 0 ? () => this.showModal(true) : null
                  }
                >
                  Inserisci dati...
                </button>
              </div>
            </div>
          </div>
          <DettaglioOrdine
            show={show}
            handleShow={this.showModal}
            carrello={carrello}
            costo={() => this.calcolaCosto()}
            clean={() => this.cleanCarrello()}
          />
        </div>
      </div>
    );
  }
}

export default MascheraOrdine;
