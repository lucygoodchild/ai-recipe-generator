import React from 'react';

export const AuthContext = React.createContext({isLoggedIn: false,
    setIsLoggedIn: (value: boolean) => {}, logout: () => {}, userId: null as string | null,
    setUserId: (id: string | null) => {}});