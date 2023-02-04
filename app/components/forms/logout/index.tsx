import { Form } from "@remix-run/react";
import { Button } from "~/components/Button";

export const LogoutButton = () => {
  return (
    <Form action="/logout" method="post">
      <Button variant="text" size="sm" className="text-xs uppercase opacity-50">
        Logout
      </Button>
    </Form>
  );
};
