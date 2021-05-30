import { get, post, put, remove } from "../http";
import * as TokenUtils from "../utils/tokenUtils";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

export const APPS_URL_ENUM = {
  APP: process.env.REACT_APP_API_URL,
  JUNO: process.env.REACT_APP_JUNO_API_URL,
};

export function getToken() {
  let token = "Bearer " + TokenUtils.getAppToken();
  let headers = { Authorization: token };
  return { headers };
}

export async function invokeGetAPI(
  context,
  header,
  APPS_URL = APPS_URL_ENUM.APP
) {
  try {
    const dataGet = await get(APPS_URL + context, header);
    return dataGet;
  } catch (error) {
    // toast.configure();
    // toast.error(error.message);
  }
}

export async function invokePostAPI(
  context,
  body,
  header,
  APPS_URL = APPS_URL_ENUM.APP
) {
  let url = APPS_URL + context;
  // console.log(url);

  try {
    let dataPost = null;
    if (header === null || header === undefined) {
      dataPost = await post(url, body);
    } else {
      dataPost = await post(url, body, header);
    }
    if (header !== null) {
      // toast.configure();
      // toast.success("Operação realizada com sucesso.");
      //alert("Operação realizada com sucesso");
    }
    return dataPost;
  } catch (error) {
    // toast.configure();
    // toast.error(error.message);
    //alert(error.message);
  }
}

export async function invokePutAPI(
  context,
  body,
  header,
  APPS_URL = APPS_URL_ENUM.APP
) {
  let url = APPS_URL + context;

  try {
    const dataPut = await put(url, body, header);
    //alert("Operação realizada com sucesso");
    // toast.configure();
    // toast.success("Operação realizada com sucesso.");
    return dataPut;
  } catch (error) {
    // toast.configure();
    // toast.error(error.message);
    //alert(error.message);
  }
}

export async function invokeRemoveAPI(
  context,
  id,
  idUser,
  header,
  APPS_URL = APPS_URL_ENUM.APP
) {
  let url = APPS_URL + context + "/" + id + "/" + idUser;
  // console.log(url);

  try {
    const dataRemove = await remove(url, header);
    return dataRemove;
  } catch (error) {
    alert(error.message);
  }
}
