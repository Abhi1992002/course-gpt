import { atom } from "recoil";

export const galleryLoadingState = atom({
  key: "galleryLoadingState", // unique ID (with respect to other atoms/selectors)
  default: true, // default value (aka initial value)
});
