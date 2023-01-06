import { Form } from "@remix-run/react";

export default function Index() {
  return (
    <div>
      <h1>Hello</h1>
      <Form method="post" action="/song/new">
        <button>New Song</button>
      </Form>
    </div>
  );
}
