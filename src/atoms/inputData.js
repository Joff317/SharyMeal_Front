import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const inputDataAtom = atom({
  city: "", 
  date: "",
});
