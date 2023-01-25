import { UserPlusIcon } from "@heroicons/react/24/outline";
import { Form } from "@remix-run/react";
import { Button } from "~/components/Button";

export const SignupButton = () => {
  return (
    <Form action="/auth/auth0?screen_hint=signup" method="post">
      <Button size="xl" className="flex items-center">
        <span className="mr-2">
          <UserPlusIcon width={"1em"} />
        </span>
        Sign Up
      </Button>
    </Form>
  );
};
