import { cloneObject } from "./objectUtils";

export async function mergeValuesAndData(data, values) {
  let dataClone = cloneObject(data);
  let valuesClone = cloneObject(values);
  dataClone.id = valuesClone._id;

  if (valuesClone._id !== null && valuesClone._id !== undefined) {
    for (const indexField in data.fields) {
      try {
        const field = dataClone.fields[indexField];
        if (field.type === "InputDate") {
          let v = eval("valuesClone." + field.name);
          if (v !== undefined) {
            dataClone.fields[indexField].value = await eval(
              "new Date(valuesClone." + field.name + ")"
            );
          }
        } else if (field.type === "SelectBox") {
          if (field.display !== undefined) {
            let indexUltimoPonto = field.display.lastIndexOf(".");
            let valorFinal = field.display.substr(0, indexUltimoPonto) + "._id";

            let v = await eval("valuesClone." + valorFinal);
            if (v !== undefined) {
              dataClone.fields[indexField].value = v;
            }
          } else {
            let v = await eval("valuesClone." + field.name);
            if (v !== undefined) {
              dataClone.fields[indexField].value = v;
            }
          }
        } else if (field.type === "MultipleSelectBox") {
          if (field.display !== undefined && field.display === "label") {
            let valor = eval("valuesClone." + field.name);
            if (valor !== undefined) {
              dataClone.fields[indexField].value = valor;
            }
          } else if (field.display !== undefined) {
            let indexUltimoPonto = field.display.lastIndexOf(".");
            let nomeArray = field.display.substr(0, indexUltimoPonto);
            let valor = eval("valuesClone." + nomeArray);

            let valorFinal = "";
            for (let index = 0; index < valor.length; index++) {
              valorFinal = valorFinal + "'" + valor[index]["_id"] + "', ";
            }
            valorFinal = valorFinal.substr(0, valorFinal.length - 1);

            console.log(valorFinal);

            dataClone.fields[indexField].value = eval("[" + valorFinal + "]");
            console.log(dataClone.fields[indexField].value);
          }
        } else {
          if (field.display !== undefined) {
            let v = await eval("valuesClone." + field.display);
            if (v !== undefined) {
              dataClone.fields[indexField].value = v;
            }
          } else {
            let v = await eval("valuesClone." + field.name);
            if (v !== undefined) {
              dataClone.fields[indexField].value = v;
            }
          }
        }
      } catch (error) {
        console.log("error:" + error);
        // alert("ERRO: " + error);
      }
    }

    return dataClone;
  }
}
