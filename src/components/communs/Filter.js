import React, { useEffect } from "react";
import Form from "./Form";
import * as DateUtils from "../../base/utils/dateUtils";

export default (props) => {

  useEffect(() => {
    filter();
  }, [props.dataFilter.context]);

  const filter = () => {
    const mainContext = props.dataFilter.context.split("?")[0];
    props.dataFilter.context = mainContext + "?" + queryStringFilter();
    props.onSave(props.dataFilter);
  };

  const queryStringFilter = () => {
    const campos = props.dataFilter.fields;
    let queryString = "";
    for (let index = 0; index < campos.length; index++) {
      const element = campos[index];
      console.log("element", element);
      let valor = "";
      let comp = document.getElementsByName(element.name);
      console.log("comp", comp);

      if (comp[0] !== undefined && comp[0] !== "") {
        let valorString;
        console.log("element.type", element.type);
        switch (element.type) {
          case "currency":
            valorString = comp[0].value + "";
            valorString = valorString.replace(".", "");
            valorString = valorString.replace(",", ".");
            valor = Number(valorString);
            if (valor) {
              queryString += comp[0].name + "=" + valor + "&";
            }
            break;
          case "InputDateTime":
            valorString = comp[0].value;
            valor = DateUtils.convertStringDateToUSDate(valorString);
            if (comp[0].value) {
              queryString += comp[0].name + "=" + comp[0].value + "&";
            }
            break;
          case "SelectBox":
            console.log('SELECT', comp[0].value);
            if (comp[0].value) {
              queryString += comp[0].name + "=" + comp[0].value + "&";
            }
            break;
          case "MultipleSelectBox":
            // console.log("multiple");
            // console.log(comp[0].options);

            const options = comp[0].options;
            let arrayValue = [];
            for (var i = 0, l = options.length; i < l; i++) {
              if (options[i].selected) {
                arrayValue.push(options[i].value);
              }
            }
            valor = arrayValue;
            if (valor) {
              queryString += comp[0].name + "={in}" + valor.split(",") + "&";
            }
            break;
          default:
            console.log("comp[0].value", comp[0].value);
            if (comp[0].value) {
              queryString += comp[0].name + "=" + comp[0].value + "&";
            }
        }
      } else {
        if (element.type === "Hidden") {
          queryString += element.name + "=" + element.value + "&";
        } else {
          valor = null;
        }
        // console.log("ARQUI");
        //queryString = comp[0].name + '={all}' + comp[0].value;
      }
      // console.log("queryString", queryString);
    }

    return queryString;
  };

  return (
    <div class="filter">
      <Form
        onSave={filter}
        saveLabel="Pesquisar"
        showCancelButton={false}
        data={props.dataFilter}
      ></Form>
    </div>
  );
};
