import React, { Component } from 'react';

class Carrello extends Component {
  render() {
    const {
      carrello,
      aumenta,
      diminuisci,
      cancella,
      costo,
      clean,
    } = this.props;

    return (
      <ul className="list-group">
        <li className="list-group-item" onClick={() => clean()}>
          <strong>Carrello</strong>
        </li>
        {carrello.map((elemento) => (
          <li className="list-group-item" key={elemento.articolo.id}>
            <div className="row align-items-center">
              <div className="col-5">
                {elemento.articolo.nome}
                <span className="badge badge-pill badge-primary mx-2">
                  {elemento.quantita}
                </span>
              </div>
              <div className="col">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => diminuisci(elemento.articolo)}
                  disabled={elemento.quantita === 1 ? true : false}
                >
                  <i className="fa fa-minus"></i>
                </button>
              </div>
              <div className="col">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => aumenta(elemento.articolo)}
                >
                  <i className="fa fa-plus"></i>
                </button>
              </div>
              <div className="col">
                <button
                  className="btn btn-danger"
                  onClick={() => cancella(elemento.articolo)}
                >
                  <strong>Cancella</strong>
                </button>
              </div>
            </div>
          </li>
        ))}
        {carrello.length > 0 && (
          <li className="list-group-item">Il costo totale è: {costo()}.</li>
        )}
      </ul>
    );
  }
}

export default Carrello;
