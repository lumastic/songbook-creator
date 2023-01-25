import { Outlet } from "@remix-run/react";
import { NavBar } from "~/components/NavBar";
import { AddSongs } from "~/dialogs/AddSongs/AddSongs";
import { EditSetlist } from "~/dialogs/EditSetlist/EditSetlist";
import { NewSetlist } from "~/dialogs/NewSetlist/NewSetlist";
import { ModalRoute, ModalRouter } from "~/lib/remix-modals";

export default function App() {
  return (
    <>
      <NavBar />
      <main className="bg-stone-300 min-h-screen py-4 px-2 md:px-0">
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
