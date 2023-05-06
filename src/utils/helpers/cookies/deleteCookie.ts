import { setCookie } from '@/utils/helpers';

export const deleteCookie = (name: string) => {
  setCookie(name, null, { expires: -1 });
};
