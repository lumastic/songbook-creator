import { Form } from '@remix-run/react';

/**
 * static login page
 * @returns
 */
export default function Login() {
  return (
    <div>
      <Form action="/auth/auth0" method="post">
        <button>Login with Auth0</button>
      </Form>
      <Form action="/auth/auth0?screen_hint=signup" method="post">
        <button>Register with Auth0</button>
      </Form>
    </div>
  );
}
