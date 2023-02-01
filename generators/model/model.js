// Remixed 😉 from https://github.com/bradgarropy/plop-generator-remix-route/blob/master/src/route.ts

module.exports = {
  description: "DB model",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "Model name",
    },
    {
      type: "checkbox",
      name: "attributes",
      loop: true,
      choices: [
        {
          name: "id",
          value: "id",
          checked: true,
        },
        {
          name: "createdAt",
          value: "createdAt",
          checked: true,
        },
        {
          name: "updatedAt",
          value: "updatedAt",
          checked: true,
        },
      ],
    },
  ],
  actions: [
    {
      type: "append",
      path: "prisma/schema.prisma",
      templateFile: "./generators/model/model.hbs",
    },
  ],
};
