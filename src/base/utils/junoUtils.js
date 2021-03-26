// Para usar é necessario adicionar na pagina que importa o seguinte
//trecho de código:

// const juno = useScript(
//   "https://sandbox.boletobancario.com/boletofacil/wro/direct-checkout.min.js"
// );
async function getCheckout() {
  let checkout = new window.DirectCheckout(
    "AC4ACBB9043077F9001BF9665CAFDBF7EF8A78AF17E995685F9D522CD2809E7F",
    false
  );
  //FIXME: guardar o token em um lugar melhor, diferenciando produçao de sandbox
  return checkout;
}

export async function validateCardNumber(cardNumber) {
  let checkout = await getCheckout();
  let retorno = await checkout.isValidCardNumber(cardNumber);
  return retorno;
}

export async function validateSecurityCode(cardNumber, securityCode) {
  let checkout = await getCheckout();
  let retorno = await checkout.isValidSecurityCode(cardNumber, securityCode);
  return retorno;
}

export async function validateExpireDate(expirationMonth, expirationYear) {
  let checkout = await getCheckout();
  let retorno = await checkout.isValidExpireDate(
    expirationMonth,
    expirationYear
  );
  return retorno;
}

export async function validateCardData(cardData) {
  let checkout = await getCheckout();
  await checkout.isValidCardData(cardData, function (error) {
    console.log(error);
    return false;
  });
  return true;
}

export async function getCargFlag(cardNumber) {
  let checkout = await getCheckout();
  return await checkout.getCardType(cardNumber);
}

export async function generateCreditCardHash(
  numeroCartao,
  nome,
  cvv,
  mesExpiracao,
  anoExpiracao,
  functionSucess,
  functionError
) {
  let checkout = await getCheckout();
  var cardData = {
    cardNumber: numeroCartao,
    holderName: nome,
    securityCode: cvv,
    expirationMonth: mesExpiracao,
    expirationYear: anoExpiracao,
  };

  console.log(cardData);

  await checkout.getCardHash(
    cardData,
    function (cardHash) {
      functionSucess(cardHash);
    },
    function (error) {
      functionError(error);
    }
  );
}
