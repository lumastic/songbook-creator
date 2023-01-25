import { Form } from "@remix-run/react";
import { Button } from "~/components/Button";

/**
 * Common log in button handling form
 * @returns
 */
export function LoginButton() {
  return (
    <Form action="/auth/auth0" method="post">
      <Button variant="secondary" size="xl">
        Login
      </Button>
    </Form>
  );
}
