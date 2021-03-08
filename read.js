function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, "g"), replace);
}

function unescapeSlashes(str) {
  // add another escaped slash if the string ends with an odd
  // number of escaped slashes which will crash JSON.parse
  let parsedStr = str.replace(/(^|[^\\])(\\\\)*\\$/, "$&\\");

  // escape unescaped double quotes to prevent error with
  // added double quotes in json string
  parsedStr = parsedStr.replace(/(^|[^\\])((\\\\)*")/g, "$1\\$2");

  try {
    parsedStr = JSON.parse(`"${parsedStr}"`);
  } catch (e) {
    return str;
  }
  return parsedStr;
}

let data = `{order number="123"}
        {pizza number="1"}
                {size}large{\size}
            {crust}hand-tossed{\crust}
            {type}custom{\type}
            {toppings area="0"}
                {item}pepperoni{\item}
                {item}extra cheese{\item}
            {\toppings}
            {toppings area="1"}
                {item}sausage{\item}
            {\toppings}
            {toppings area="2"}
                {item}mushrooms{\item}
            {\toppings}
        {\pizza}
        {pizza number="2"}
            {size}medium{\size}
            {crust}deep dish{\crust}
            {type}pepperoni feat{\type}
        {\pizza}
    {\order}
    `;

var replaced = str.replace(String.fromCharCode(92),String.fromCharCode(92,92));

return console.log(data.replace(/\\/g, "/"));

let new_data = replaceAll(data, "{", "<");
new_data = replaceAll(new_data, "}", ">");

// let rep = replaceAll(new_data, /\s/g, "/s");
let rep = replaceAll(new_data, "{p", "/t");

var parseString = require("xml2js").parseString;
var xml = rep;
// parseString(xml, function (err, result) {
//   console.log(err);
//   console.dir(result);
// });
console.log(rep);
// console.log(JSON.parse(rep));
