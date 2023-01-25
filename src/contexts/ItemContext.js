import React, { useContext } from 'react'

const ItemContext = React.createContext()


export function useItemContext() {
    return useContext(ItemContext)
}

export const ItemContextProvider = ({children}) => {
    return <ItemContext.Provider value={{children}}>
        {children}
    </ItemContext.Provider>
}