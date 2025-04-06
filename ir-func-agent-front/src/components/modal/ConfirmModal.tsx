import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useConfirmModal } from "@/hooks/useConfirmModal";

export const ConfirmModal = () => {
  const { confirmModal, closeConfirmModal } = useConfirmModal();
  const execHandler = () => {
    confirmModal?.execHandler?.();
    closeConfirmModal();
  };
  const cancelHandler = () => {
    confirmModal?.cancelHandler?.();
    closeConfirmModal();
  };
  return (
    <Dialog open={confirmModal?.isOpen} onOpenChange={closeConfirmModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{confirmModal?.title}</DialogTitle>
          {/* <DialogDescription>{confirmModal?.description}</DialogDescription> */}
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <p>{confirmModal?.description}</p>
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary" onClick={cancelHandler}>
              {confirmModal?.cancelLabel ?? "NO"}
            </Button>
          </DialogClose>
          <Button type="button" onClick={execHandler}>
            {confirmModal?.execLabel ?? "YES"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
