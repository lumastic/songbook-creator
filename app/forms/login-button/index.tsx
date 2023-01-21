import { Form } from '@remix-run/react';

/**
 * Common log in button handling form
 * @returns
 */
export default function LogInButton() {
  return (
    <Form action="/auth/auth0" method="post">
      <button>Login</button>
    </Form>
  );
}
