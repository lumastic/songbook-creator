import { Form } from "@remix-run/react";
import { Button } from "~/components/Button";

export const LogoutButton = () => {
  return (
    <Form action="/logout" method="post">
      <Button variant="text">Logout</Button>
    </Form>
  );
};
