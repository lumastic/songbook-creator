import { Outlet } from "@remix-run/react";
import { NavBar } from "~/components/NavBar";
import { AddSongs } from "~/components/dialogs/AddSongs/AddSongs";
import { EditSetlist } from "~/components/dialogs/EditSetlist/EditSetlist";
import { NewSetlist } from "~/components/dialogs/NewSetlist/NewSetlist";
import { ModalRoute, ModalRouter } from "~/lib/remix-modals";

export default function App() {
  return (
    <>
      <NavBar />
      <main className="bg-neutral-200 min-h-screen py-4 px-2 md:px-0">
        <Outlet />
      </main>
      <ModalRouter>
        <ModalRoute path="new-setlist" component={<NewSetlist />} />
        <ModalRoute path="edit-setlist" component={<EditSetlist />} />
        <ModalRoute path="add-songs" component={<AddSongs />} />
      </ModalRouter>
    </>
  );
}
