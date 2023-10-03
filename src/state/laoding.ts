import { atom } from "recoil";

export const loadingState = atom({
    key: 'loadingState', // unique ID (with respect to other atoms/selectors)
    default: true, // default value (aka initial value)
  });