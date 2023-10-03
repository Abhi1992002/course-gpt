import { atom } from "recoil";

export const modeState = atom({
    key: 'modeState', // unique ID (with respect to other atoms/selectors)
    default: 0, // default value (aka initial value)
  });