import { TConfirmModal } from "@/types/type";
import { atom } from "jotai";

export const confirmModalAtom = atom<TConfirmModal | null>(null);