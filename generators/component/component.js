// Remixed 😉 from https://github.com/bradgarropy/plop-generator-remix-route/blob/master/src/route.ts

module.exports = {
  description: "⚛ React component",
  prompts: [
    {
      type: "input",
      name: "name",
      message: "Name of the component",
    },
    {
      type: "checkbox",
      name: "features",
      message: "Attributes of the component to autogenerate...",
      loop: true,
      choices: [
        {
          name: "With Children",
          value: "withchildren",
          checked: true,
        },
        {
          name: "Forward Ref",
          value: "forwardref",
          checked: false,
        },
      ],
    },
  ],
  actions: [
    {
      type: "add",
      path: "app/components/{{name}}/{{name}}.tsx",
      templateFile: "./generators/component/component.hbs",
    },
    {
      type: "add",
      path: "app/components/{{name}}/{{name}}.test.tsx",
      templateFile: "./generators/component/component.test.hbs",
    },
    {
      type: "add",
      path: "app/components/{{name}}/{{name}}.stories.tsx",
      templateFile: "./generators/component/component.stories.hbs",
    },
    {
      type: "add",
      path: "app/components/{{name}}/index.tsx",
      templateFile: "./generators/component/component.index.hbs",
    },
  ],
};
