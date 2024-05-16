import { atom, useAtom } from "jotai";
export const dialogAtom = atom<boolean>(false);
export const otpAtom = atom<string>("");
export const useDialogModalAtom = () => {
  const [openLoginModal, setOpenLoginModal] = useAtom(dialogAtom);
  const [otpText, setOtpText] = useAtom(otpAtom);
  return {
    openLoginModal,
    setOpenLoginModal,
    otpText,
    setOtpText,
  };
};
