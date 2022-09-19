import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const inputDataAtom = atomWithStorage("inputData", {
  city: "",
  lat: "",
  lon: "",
  date: "",
});
