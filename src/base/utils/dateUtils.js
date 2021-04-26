const intervals = [
  { label: "ano", labelPlural: "anos", seconds: 31536000 },
  { label: "mês", labelPlural: "meses", seconds: 2592000 },
  { label: "dia", labelPlural: "dias", seconds: 86400 },
  { label: "hora", labelPlural: "horas", seconds: 3600 },
  { label: "minuto", labelPlural: "minutos", seconds: 60 },
  { label: "segundo", labelPlural: "segundos", seconds: 0 },
];

export function formatDate(date) {
  let data = new Date(date);
  let mes = data.getMonth() + 1;
  let dataFormatada =
    (data.getDate() < 10 ? "0" + data.getDate() : data.getDate()) +
    "/" +
    (mes < 10 ? "0" + mes : mes) +
    "/" +
    data.getFullYear();
  return dataFormatada;
  //Saida 31/12/2020
}

export function convertStringDateToUSDate(strDate) {
  let pattern = /(\d{2})\/(\d{2})\/(\d{4}) (.+)/;
  let strDateConverted = new Date(strDate.replace(pattern, "$3-$2-$1 $4"));

  return new Date(strDateConverted);
}

export function convertUSDate(date) {
  let data = new Date(date);
  let mes = data.getMonth() + 1;
  let dia = data.getDate() < 10 ? "0" + data.getDate() : data.getDate();
  let dataFormatada =
    data.getFullYear() + "-" + (mes < 10 ? "0" + mes : mes) + "-" + dia;
  return dataFormatada;
  //Saida 2020-12-31
}

export function timeSince(strDate) {
  let date = new Date(strDate);
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const interval = intervals.find((i) => i.seconds < seconds);
  let count = 0;

  if (interval === undefined || interval.seconds === undefined) {
    count = Math.floor(seconds / 1);
  } else {
    count = Math.floor(seconds / interval.seconds);
  }
  //count = Math.floor(seconds / interval.seconds);

  if (interval !== undefined && interval.label !== undefined) {
    return `${count} ${
      count !== 1 ? interval.labelPlural : interval.label
    } atrás`;
  } else {
    return "1 segundos atrás";
  }
}
