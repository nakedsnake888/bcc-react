import http from './httpService';
import { ordiniEndpoint } from '../config.json';

export function postOrdine(data) {
  return http.post(ordiniEndpoint, data, { headers: http.addAuthorization() });
}
