import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import Cookies from "js-cookie";

export const logged = atom(Cookies.get("token"));

export const currentuser = atomWithStorage({});
