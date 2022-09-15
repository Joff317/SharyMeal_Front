import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import Cookies from "js-cookie";

export const loggedAtom = atom(Cookies.get("token"));

export const currentuserAtom = atomWithStorage("currentUser", {});
