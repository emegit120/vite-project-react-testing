import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { } from '@redux-devtools/extension' // required for devtools typing
import { immer } from 'zustand/middleware/immer'

type UserObject = {
    nome: string
    email: string
    phone: string
    senha: string
    termos: boolean
}

interface UserState {
    registerUser: (user: UserObject) => void
    user: UserObject
    bears: number
    increase: (by: number) => void
    
}

export const useUserState = create<UserState>()(
    devtools(
        persist(
            immer(
                (set) => ({
                    registerUser: (user) => set((state) => {
                        state.user = user
                    }),
                    user: <UserObject>{},
                    bears: 0,
                    increase: () => set((state) => { state.bears += 1; }),
                }),
            ),
            {
                name: 'user-storage',
            },
        ),
    ),
)

