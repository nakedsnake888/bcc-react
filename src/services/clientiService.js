import http from './httpService';
import {
  apiClienteEndpoint,
  apiVerifyAnagraficaEndpoint,
} from '../config.json';

export function getClienti(data) {
  return http.get(apiClienteEndpoint, createHeader(data));
}

export function postClienteModified(data) {
  return http.post(apiVerifyAnagraficaEndpoint, data, {
    headers: http.addAuthorization(),
  });
}
function createHeader(data) {
  const requests = {
    headers: http.addAuthorization(),
    params: {
      branch: data.filialeId,
      nag: data.nag,
    },
  };
  if (data.nome !== '') requests.params.customerName = data.nome;
  if (data.date !== '')
    requests.params.birthDate =
      data.date.getMonth() +
      1 +
      '/' +
      data.date.getDate() +
      '/' +
      data.date.getFullYear();
  return requests;
}
