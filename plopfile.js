module.exports = async function (
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
  await plop.load("@dlytle/remix-generators", {
    routeFolderPath: "app/routes/__app",
  });
  plop.setGenerator("component", require("./generators/component"));
  plop.setGenerator("model", require("./generators/model"));
};
