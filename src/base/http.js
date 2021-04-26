import axios from "axios";
import { Service } from "axios-middleware";

const service = new Service(axios);

service.register({
  onRequest(config) {
    return config;
  },
  onSync(promise) {
    return promise;
  },
  onResponse(response) {
    return response;
  },
});

export async function get(url, headers) {
  //axios.defaults.headers.common["Authorization"] = token;
  return await axios.get(url, headers).then((response) => response.data);
}

export async function post(url, obj, headers) {
  return await axios.post(url, obj, headers).then((response) => response.data);
}
export async function put(url, obj, headers) {
  return await axios.put(url, obj, headers).then((response) => response.data);
}

export async function remove(url, headers) {
  return await axios.delete(url, headers);
}

export async function update(url, headers, obj) {
  return await axios.patch(url, headers, obj);
}
