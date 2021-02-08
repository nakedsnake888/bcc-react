import React, { Component } from 'react';
import Table from './common/table';

class ClientiTable extends Component {
  //Descrizione delle colonne.
  columns = [
    {
      path: 'cab',
      label: 'Cab',
    },
    {
      path: 'nag',
      label: 'Nag',
    },
    {
      path: 'nome',
      label: 'Nome',
    },
    {
      path: 'dataNascita',
      label: 'Data di Nascita',
    },
    {
      key: 'dettagli',
      label: 'Dettagli',
      content: (cliente) => (
        <i
          className={
            cliente.confermato ? 'fa fa-search fa-lg' : 'fa fa-pencil fa-lg'
          }
          aria-hidden="true"
          onClick={() => this.props.setItem(cliente)}
        ></i>
      ),
    },
  ];

  render() {
    const { data } = this.props;
    return <Table columns={this.columns} data={data} />;
  }
}

export default ClientiTable;
