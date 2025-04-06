import { useAtomValue, useSetAtom } from "jotai";

import { confirmModalAtom } from "@/atoms/confirmAtom";
import { TConfirmModal } from "@/types/type";

export const useConfirmModal = () => {
  const confirmModal = useAtomValue(confirmModalAtom);
  const setConfirmModal = useSetAtom(confirmModalAtom)

  const openConfirmModal = (modal: TConfirmModal) => {
    setConfirmModal(modal);
  };

  const closeConfirmModal = () => {
    setConfirmModal(null);
  };

  return { confirmModal, openConfirmModal, closeConfirmModal };
};


