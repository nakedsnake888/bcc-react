import http from './httpService';
import { articoliEndpoint } from '../config.json';

export function getArticoli(nome) {
  return http.get(articoliEndpoint, createHeader(nome));
}

function createHeader(nome) {
  const requests = {
    headers: http.addAuthorization(),
    params: { name: nome },
  };
  return requests;
}
