import { setCookie } from '@/utils';

export const deleteCookie = (name: string) => {
  setCookie(name, null, { expires: -1 });
};
