module.exports = function (
  /** @type {import('plop').NodePlopAPI} */
  plop
) {
  plop.setHelper("includes", (array, string, options) => {
    if (array.includes(string)) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });
  plop.setGenerator("route", require("./generators/route"));
};
