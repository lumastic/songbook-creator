import { Button } from "./Button";

export const Primary = () => {
  return (
    <div className="flex items-end space-x-4">
      <Button size="sm" variant="primary">
        Button Text
      </Button>
      <Button size="md" variant="primary">
        Button Text
      </Button>
      <Button size="lg" variant="primary">
        Button Text
      </Button>
      <Button size="xl" variant="primary">
        Button Text
      </Button>
    </div>
  );
};

export const Secondary = () => {
  return (
    <div className="flex items-end space-x-4">
      <Button size="sm" variant="secondary">
        Button Text
      </Button>
      <Button size="md" variant="secondary">
        Button Text
      </Button>
      <Button size="lg" variant="secondary">
        Button Text
      </Button>
      <Button size="xl" variant="secondary">
        Button Text
      </Button>
    </div>
  );
};

export const Text = () => {
  return (
    <div className="flex items-end space-x-4">
      <Button size="sm" variant="text">
        Button Text
      </Button>
      <Button size="md" variant="text">
        Button Text
      </Button>
      <Button size="lg" variant="text">
        Button Text
      </Button>
      <Button size="xl" variant="text">
        Button Text
      </Button>
    </div>
  );
};

export const Outlined = () => {
  return (
    <div className="flex items-end space-x-4">
      <Button size="sm" variant="outlined">
        Button Text
      </Button>
      <Button size="md" variant="outlined">
        Button Text
      </Button>
      <Button size="lg" variant="outlined">
        Button Text
      </Button>
      <Button size="xl" variant="outlined">
        Button Text
      </Button>
    </div>
  );
};
