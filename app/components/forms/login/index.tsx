import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { Form } from "@remix-run/react";
import { Button } from "~/components/Button";

/**
 * Common log in button handling form
 * @returns
 */
export function LoginButton() {
  return (
    <Form action="/auth/auth0" method="post">
      <Button variant="secondary" size="xl" className="flex items-center">
        <span className="mr-2">
          <ArrowRightOnRectangleIcon width={"1em"} />
        </span>
        Login
      </Button>
    </Form>
  );
}
