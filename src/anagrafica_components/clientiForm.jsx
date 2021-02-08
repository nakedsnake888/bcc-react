import React from 'react';
import Form from './common/form';
import Joi from 'joi-browser';
//import { LABELS } from './common/Constants';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getFiliali } from './../services/filialeService';
import { getClienti } from './../services/clientiService';
import { Container } from 'react-bootstrap';

class ClientiForm extends Form {
  //Inizializzo stato
  state = {
    data: {
      filialeId: '',
      nag: '',
      nome: '',
      date: '',
    },
    filiali: [],
    errors: {},
  };

  //Schema
  schema = {
    filialeId: Joi.number().required().label('Filiale'),
    nag: Joi.string()
      .regex(/^[0-9]+$/)
      .min(1)
      .required()
      .label('NAG'),
    date: [Joi.date().label('Data di nascita'), Joi.string().allow('')],
    nome: Joi.when('date', {
      is: Joi.date(),
      then: Joi.string()
        .regex(/^[A-Za-z]+$/)
        .required()
        .label('Nome con data'),
      otherwise: Joi.string()
        .regex(/^[A-Za-z]+$/)
        .allow('')
        .label('Nome senza data'),
    }),
  };

  //Funzione per popolare il campo filiali
  async populateFiliali() {
    const { data: filiali } = await getFiliali();
    this.setState({ filiali });
  }

  //Inizializzo parti di stato restanti.
  async componentDidMount() {
    await this.populateFiliali();
  }

  //Richiesta clienti
  doSubmit = async () => {
    const { data } = await getClienti(this.state.data);
    this.props.updateClienti(data);
  };

  //Aggiorno campo date dello stato.
  updateDate(valore) {
    const data = { ...this.state.data };
    if (valore === null) data.date = '';
    else data.date = valore;
    const errors = this.validate(data);
    this.setState({ data, errors: errors || {} });
  }

  //Render del form.
  render() {
    return (
      <Container fluid>
        <form onSubmit={this.handleSubmit}>
          <div className="form-row">
            {this.renderSelect(
              'filialeId',
              'Filiali*',
              this.state.filiali,
              'col'
            )}
            {this.renderInput('nag', 'NAG*', 'text')}
            {this.renderInput('nome', 'Nome', 'text')}
            <div className="mx-2">
              <label htmlFor="date">Data di nascita</label>
              <br></br>
              <DatePicker
                id="date"
                isClearable
                className="form-control"
                selected={this.state.data.date}
                onChange={(valore) => this.updateDate(valore)}
              />
            </div>
            {this.renderButton('Ricerca')}
          </div>
        </form>
      </Container>
    );
  }
}

export default ClientiForm;
