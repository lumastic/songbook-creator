// Remixed 😉 from https://github.com/bradgarropy/plop-generator-remix-route/blob/master/src/route.ts

module.exports = {
  description: "💿 Remix route",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "Route path (file extension will be added automatically)",
    },
    {
      type: "checkbox",
      name: "features",
      loop: true,
      choices: [
        {
          name: "Links Function",
          value: "links",
          checked: false,
        },
        {
          name: "Meta Function",
          value: "meta",
          checked: false,
        },
        {
          name: "React Component",
          value: "component",
          checked: true,
        },
        {
          name: "Loader Function",
          value: "loader",
          checked: true,
        },
        {
          name: "Action Function",
          value: "action",
          checked: true,
        },
        {
          name: "Catch Boundary",
          value: "catch",
          checked: true,
        },
        {
          name: "Error Boundary",
          value: "error",
          checked: true,
        },
      ],
    },
  ],
  actions: [
    {
      type: "add",
      path: "app/routes/{{name}}.tsx",
      templateFile: "./generators/route/route.hbs",
    },
  ],
};
