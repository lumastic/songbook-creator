import type { UseDataFunctionReturn } from "remix-typedjson/dist/remix";
import { useRouteData } from "remix-utils";
import { Dialog } from "~/components/Dialog";
import { SetlistForm } from "forms/setlist";
import { useModalFetcher } from "~/lib/remix-modals";
import { useModal } from "~/lib/remix-modals/useModal";
import type { loader as SetlistLoader } from "~/routes/__app/setlists/$id/index";

export function EditSetlist() {
  const data = useRouteData<UseDataFunctionReturn<typeof SetlistLoader>>(
    "routes/__app/setlists/$id/index"
  );

  const { isOpen, close } = useModal();
  const { Form, action } = useModalFetcher(
    `/setlists/${data?.setlist.id}/edit`
  );

  return (
    <Dialog title="Edit Setlist" isOpen={isOpen} onClose={close}>
      <SetlistForm
        form={Form}
        close={close}
        action={action}
        setlist={data?.setlist}
      />
    </Dialog>
  );
}
