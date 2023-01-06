import { Select } from "./Select";

export const Basic = () => (
  <Select
    options={[
      { name: "Test", value: "test" },
      { name: "Test 2", value: "test2" },
    ]}
    name="select"
  />
);
