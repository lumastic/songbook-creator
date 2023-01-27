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
  await plop.load("@dlytle/react-component-generator", {
    componentFolderPath: "app/components",
  });
  plop.setGenerator("model", require("./generators/model"));
};

// "We don't have ot worry about auth if we have a Gatway"? - what does that mean
//
