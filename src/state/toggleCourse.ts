import { atom } from "recoil";

export const toggleState = atom({
  key: "toggleState", // unique ID (with respect to other atoms/selectors)
  default: "Video-page", // default value (aka initial value)
});
