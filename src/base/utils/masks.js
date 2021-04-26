export function maskCEP(e) {
  e.currentTarget.maxLength = 9;
  let value = e.currentTarget.value;
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{5})(\d)/, "$1-$2");

  e.currentTarget.value = value;
  return e;
}

export function maskCurrency(e) {
  let value = e.currentTarget.value;
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d)(\d{2})$/, "$1,$2");
  value = value.replace(/(?=(\d{3})+(\D))\B/g, ".");

  e.currentTarget.value = value;
  return e;
}

export function maskCPF(e) {
  e.currentTarget.maxLength = 14;
  let value = e.currentTarget.value;
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  e.currentTarget.value = value;
  return e;
}

export function maskCNPJ(e) {
  e.currentTarget.maxLength = 18;
  let value = e.currentTarget.value;
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{2})(\d)/, "$1.$2");
  value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
  value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
  value = value.replace(/(\d{4})(\d)/, "$1-$2");

  e.currentTarget.value = value;
  return e;
}

export function maskTelefone(e) {
  e.currentTarget.maxLength = 17;
  let value = e.currentTarget.value;
  value = value.replace(/\D/g, "");

  value = value.replace(/^(\d)/, "+$1");
  value = value.replace(/(.{3})(\d)/, "$1($2");
  value = value.replace(/(.{6})(\d)/, "$1)$2");
  if (value.length == 12) {
    value = value.replace(/(.{1})$/, "-$1");
  } else if (value.length == 13) {
    value = value.replace(/(.{2})$/, "-$1");
  } else if (value.length == 14) {
    value = value.replace(/(.{3})$/, "-$1");
  } else if (value.length == 15) {
    value = value.replace(/(.{4})$/, "-$1");
  } else if (value.length > 15) {
    value = value.replace(/(.{4})$/, "-$1");
  }
  e.currentTarget.value = value;
  return e;
}

export function maskCartaoCredito(e) {
  e.currentTarget.maxLength = 19;
  let value = e.currentTarget.value;
  value = value.replace(/\D/g, ""); // Permite apenas dígitos
  value = value.replace(/(\d{4})/g, "$1."); // Coloca um ponto a cada 4 caracteres
  value = value.replace(/\.$/, ""); // Remove o ponto se estiver sobrando
  value = value.substring(0, 19); // Limita o tamanho

  e.currentTarget.value = value;
  return value;
}

export function maskValidadeCartao(e) {
  e.currentTarget.maxLength = 5;
  let value = e.currentTarget.value;
  value = value.replace(/\D/g, ""); // Permite apenas dígitos
  value = value.replace(/(\d{2})/g, "$1/"); // Coloca um ponto a cada 4 caracteres
  value = value.replace(/\/$/, ""); // Remove o ponto se estiver sobrando

  e.currentTarget.value = value;
  return value;
}
