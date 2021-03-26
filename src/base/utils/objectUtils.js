export function cloneObject(jsonObject) {
  let clone = JSON.stringify(jsonObject);
  return JSON.parse(clone);
}
export async function convertToSelectItens(object, valueName, displayNames) {
  let options = [];
  for (let item in object) {
    let display = "";
    if (Array.isArray(displayNames)) {
      for (let name in displayNames) {
        display = display + object[item][displayNames[name]] + " - ";
      }
      display = display.substr(0, display.length - 3);
    } else {
      display = object[item][displayNames];
    }

    options.push(
      <option key={item} value={object[item][valueName]}>
        {display}
      </option>
    );
  }
  console.log(options);

  return options;
}
