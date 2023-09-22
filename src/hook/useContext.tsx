import { createContext, useState } from 'react'

import { UserType } from '~/types/user.types';
import { getAccessToken, getProfile } from '~/utils';
interface UseContextType {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  idDelete: string,
  setIdDelete: React.Dispatch<React.SetStateAction<string>>
  authentication: boolean,
  setAuthentication: React.Dispatch<React.SetStateAction<boolean>>;
  profile: UserType | null
  setProfile: React.Dispatch<React.SetStateAction<UserType | null>>
  reset:()=>void
}

export const Theme = createContext<UseContextType>({
  toggle: false,
  setToggle: () => null,
  idDelete: '',
  setIdDelete: () => null,
  authentication: Boolean(getAccessToken()),
  setAuthentication: () => null,
  setProfile: () => null,
  profile: null,
  reset:()=>null
})

export const ProviderContext = ({ children }: { children: React.ReactNode }) => {
  const [toggle, setToggle] = useState<boolean>(false)
  const [idDelete, setIdDelete] = useState<string>('')
  const [authentication, setAuthentication] = useState<boolean>(Boolean(getAccessToken()))
  const [profile, setProfile] = useState<UserType | null>(getProfile())
  const reset=()=>{
    setAuthentication(false)
    setProfile(null)
  }
  return <Theme.Provider value={{reset, profile, setProfile, toggle, setToggle, idDelete, setIdDelete, authentication, setAuthentication }}>{children}</Theme.Provider>

}