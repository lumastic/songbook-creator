import { Form } from '@remix-run/react';
import Login from '~/forms/login-button';
import LogOut from '~/forms/logout-button';

export default function Index() {
  return (
    <div>
      <h1>Hello</h1>

      <Login />

      <Form method="post" action="/song/new">
        <button>New Song</button>
      </Form>

      <LogOut />
    </div>
  );
}
