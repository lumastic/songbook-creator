import { Form } from '@remix-run/react';

export const LogOutButton = () => {
  return (
    <Form action="/logout" method="post">
      <button>Logout</button>
    </Form>
  );
};

export default LogOutButton;
