import { Dialog } from "~/components/Dialog";
import { SetlistForm } from "~/forms/setlist";
import { useModalFetcher } from "~/lib/remix-modals";
import { useModal } from "~/lib/remix-modals/useModal";

export function NewSetlist() {
  const { isOpen, close } = useModal();
  const { Form } = useModalFetcher("/setlists/new");
  return (
    <Dialog title="New Setlist" isOpen={isOpen} onClose={close}>
      <SetlistForm form={Form} close={close} />
    </Dialog>
  );
}
