import { UserType } from "~/types/user.types";

export const localStorageEventTaget= new EventTarget()
export const setAccessToken = (access_token: string) => {
  return localStorage.setItem('access_token', access_token);
}
export const getAccessToken = () => {
  return localStorage.getItem('access_token');
}
export const setRefreshToken = (refresh_token: string) => {
  return localStorage.setItem('refresh_token', refresh_token);
}

export const getRefreshToken = () => {
  return localStorage.getItem('refresh_token');
}

export const setProfile = (profile: UserType) => {
  return localStorage.setItem('profile', JSON.stringify(profile));
}

export const getProfile = () => {
  return JSON.parse(localStorage.getItem('profile') as string);

}

export const deleteLocalStorage = () => {
  // tạo 1 cái event
  const clearLS= new Event('clearLS')
  // khi delete thì lắng nghe  cái event clearLs của localStorageEventTaget đang thực hiện
  localStorageEventTaget.dispatchEvent(clearLS)
    localStorage.clear()
}