// import jwt_decode from "jwt-decode";

export function getAppToken() {
  let token = localStorage.getItem("AT");
  //console.log(token);
  return token;
}
export function getFotoUsuarioLogado() {
  let token = localStorage.getItem("FOTO");
  //   console.log(token);

  return token;
}
export function storeAppToken(token) {
  localStorage.setItem("AT", token);
}

export function storeFotoPerfil(foto) {
  if (foto !== undefined) {
    localStorage.setItem("FOTO", foto);
  }
}

function openTokenUsingJwt() {
  if (
    getAppToken() !== undefined &&
    getAppToken() !== null &&
    getAppToken() !== ""
  ) {
    // let tokenAberto = jwt_decode(getAppToken());
    // return tokenAberto;
    return null;
  } else {
    return undefined;
  }
}

export function getIdUserFromAppToken() {
  // let tokenAberto = openTokenUsingJwt();
  // console.log(tokenAberto.idUser);

  // return tokenAberto.idUser;
  return null;
}
export function getEmailUserFromAppToken() {
  // let tokenAberto = openTokenUsingJwt();
  // console.log(tokenAberto.idUser);

  // return tokenAberto.email;
  return null;
}
export function getIdMembroFromAppToken() {
  // let tokenAberto = openTokenUsingJwt();
  // console.log(tokenAberto.idMembro);

  // return tokenAberto.idMembro;
  return null;
}

export function getMembroPermiteContaDigitalFromAppToken() {
  // let tokenAberto = openTokenUsingJwt();
  // console.log(tokenAberto.idMembro);
  // return tokenAberto.permitirContaDigital;
  return null;
}

export function getNameUserFromAppToken() {
  // let tokenAberto = openTokenUsingJwt();
  // console.log(tokenAberto.nome);
  // console.log(tokenAberto);

  // return tokenAberto.nome;
  return null;
}

export function getNameAssociacaoFromAppToken() {
  // let tokenAberto = openTokenUsingJwt();
  // console.log(tokenAberto.nomeAssociacao);

  // return tokenAberto.nomeAssociacao;
  return null;
}
export function getPapelFromAppToken() {
  // let tokenAberto = openTokenUsingJwt();
  // console.log(tokenAberto.nomeAssociacao);
  // if (tokenAberto === undefined || tokenAberto.profile === undefined) {
  //   return undefined;
  // } else {
  //   return tokenAberto.profile.name;
  // }
  return null;
}
export function getIdAssociacaoFromAppToken() {
  // let tokenAberto = openTokenUsingJwt();
  // console.log(tokenAberto.nomeAssociacao);

  // return tokenAberto.idAssociacao;
  return null;
}

export function getPermissoesFromAppToken() {
  // let tokenAberto = openTokenUsingJwt();
  // console.log(tokenAberto.nomeAssociacao);
  // if (tokenAberto !== undefined) {
  //   return tokenAberto.permissoes;
  // } else {
  //   return [];
  // }
}

export function getFuncaoUserFromAppToken() {
  // let tokenAberto = openTokenUsingJwt();
  // console.log(tokenAberto.funcao);
  // return tokenAberto.funcao;
}

export function destroyAppToken() {
  localStorage.removeItem("AT");
  localStorage.removeItem("FOTO");
}
