import http from "./httpService";
import { apiFilialiEndpoint } from "../config.json";

export function getFiliali() {
  const headers = {
    Authorization: http.setJwt()
  }
  return http.get(apiFilialiEndpoint, {headers});
}
