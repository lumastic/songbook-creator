import { Form } from '@remix-run/react';

export default function MySetlist() {
  return (
    <div>
      <button>FeetFoxies</button>
      <Form action="/logout" method="post">
        <button>Logout</button>
      </Form>
    </div>
  );
}
