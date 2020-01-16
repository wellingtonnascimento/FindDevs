module.exports = function parseStringAsArray(arrayAsString) {
    return arrayAsString.split(",").map(entry => entry.trim());
    // .map(entry => entry.trim()) remove todos os espaços antes e depois da string
  };