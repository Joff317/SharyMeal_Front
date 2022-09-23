import { atomWithStorage } from "jotai/utils";

export const CheckedAtom = atomWithStorage("memochecked", true);
