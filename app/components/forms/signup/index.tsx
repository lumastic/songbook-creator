import { Form } from "@remix-run/react";
import { Button } from "~/components/Button";

export const SignupButton = () => {
  return (
    <Form action="/auth/auth0?screen_hint=signup" method="post">
      <Button size="xl">Sign Up</Button>
    </Form>
  );
};
