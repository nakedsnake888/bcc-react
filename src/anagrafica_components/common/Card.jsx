import React, { Component } from 'react';

class Card extends Component {
  //Metodo per controllare se renderizzare il pulsante
  filtra(carrello, articolo) {
    if (typeof articolo === 'undefined') return false;
    let bool = true;
    carrello.forEach((element) => {
      if (element.articolo.id === articolo.id) bool = false;
    });

    return bool;
  }

  render() {
    const { articolo, carrello, aggiungiArticolo } = this.props;

    this.filtra(carrello);
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            {articolo.nome ? articolo.nome : 'Seleziona un articolo...'}
          </h5>
          <h6 className="card-subtitle mb-2 text-muted">
            {articolo.prezzo ? '€ ' + articolo.prezzo : ''}
          </h6>
          <p className="card-text">{articolo.descrizione}</p>
          {articolo.nome && this.filtra(carrello, articolo) && (
            <button
              className="btn btn-primary mx-1"
              onClick={() => aggiungiArticolo(articolo)}
            >
              Aggiungi
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Card;
