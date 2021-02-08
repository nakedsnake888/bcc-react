import React, { Component } from 'react';

class ListGroup extends Component {
  render() {
    const { articoli, seleziona, selezionato } = this.props;

    return (
      <div className="list-group">
        <button className="list-group-item" onClick={() => this.props.reset()}>
          <strong>Lista Articoli</strong>
        </button>
        {articoli.map((articolo) => (
          <button
            style={{ textDecoration: 'none' }}
            className={
              selezionato.id === articolo.id
                ? 'list-group-item list-group-item-action active'
                : 'list-group-item list-group-item-action'
            }
            key={articolo.id}
            onClick={() => seleziona(articolo)}
          >
            {articolo.nome}
          </button>
        ))}
      </div>
    );
  }
}

export default ListGroup;
