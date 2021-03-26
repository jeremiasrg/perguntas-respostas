import { get, post, put, remove } from "../http";
import * as TokenUtils from "./tokenUtils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
