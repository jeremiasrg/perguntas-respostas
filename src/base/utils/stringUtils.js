export function removePontosTracoCPF(cpf) {
  let cpfSemPonto = cpf.replaceAll(".", "");
  let cpfSemTraco = cpfSemPonto.replaceAll("-", "");
  return cpfSemTraco;
}
export function removePontosTracoCNPJ(cnpj) {
  let cnpjSemPonto = cnpj.replaceAll(".", "");
  let cnpjSemTraco = cnpjSemPonto.replaceAll("-", "");
  let cnpjSemBarra = cnpjSemTraco.replaceAll("/", "");
  return cnpjSemBarra;
}
export function removeTracoCEP(cep) {
  let cepSemTraco = cep.replaceAll("-", "");
  return cepSemTraco;
}
export function removeTracoTelefone(telefone) {
  let telefoneSemTraco = telefone.replaceAll("-", "");
  let telefoneSemParenteses1 = telefoneSemTraco.replaceAll("(", "");
  let telefoneSemParenteses2 = telefoneSemParenteses1.replaceAll(")", "");
  let telefoneSemMais = telefoneSemParenteses2.replaceAll("+", "");
  return telefoneSemMais;
}

export function converteNumeroEmLetra(numero) {
  switch (numero) {
    case 1:
      return "A";
    case 2:
      return "B";
    case 3:
      return "C";
    case 4:
      return "D";
    case 5:
      return "E";
    case 6:
      return "F";
    case 7:
      return "G";
    case 8:
      return "H";
    case 9:
      return "I";
    case 10:
      return "J";
    case 11:
      return "K";
    case 12:
      return "L";
    case 13:
      return "M";
    case 14:
      return "N";

    default:
  }
}

export function generateGuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
