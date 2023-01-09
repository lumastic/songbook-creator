import { Button } from "~/components/Button";
import { Dialog } from "~/components/Dialog";
import { useModal } from "~/lib/remix-modals/useModal";

export function NewSetlist() {
  const { isOpen, close } = useModal();
  return (
    <Dialog
      title="Deactivate account"
      description="Your payment has been successfully submitted. We’ve sent you an
    email with all of the details of your order."
      isOpen={isOpen}
      onClose={close}
    >
      <div className="mt-4">
        <Button type="button" variant="secondary" onClick={close}>
          Got it, thanks!
        </Button>
      </div>
    </Dialog>
  );
}
