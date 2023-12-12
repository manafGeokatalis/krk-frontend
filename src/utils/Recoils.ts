import { atom } from "recoil";

export const user = atom({
  key: 'user',
  default: null
})

export const notification = atom({
  key: 'notification',
  default: {
    show: false,
    type: 'success',
    message: '',
  }
});