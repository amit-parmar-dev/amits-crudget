import React, { useContext, useState } from 'react'
import { v4 } from 'uuid'
import useLocalStorage from '../hooks/useLocalStorage'

const ItemContext = React.createContext()


export function useItemContext() {
    return useContext(ItemContext)
}


export const ItemContextProvider = ({children}) => {
    const [budgets, setBud] = useLocalStorage("budgets", [])
    const [expenses, setExp] = useLocalStorage("expenses", [])

    function getBudExp (budgetID) {
        return expenses.filter(expense => expense.budgetID === budgetID)
    }

    function createBudget ({ name, max }) {
        setBud(prevBud => {
            if (prevBud.find(budget => budget.name === name)) {
                return prevBud
            }
            return [...prevBud, {id: v4(), name, max}]
        })
    }
    
    function createExpense ({ desc, total, budgetID}) {
        setExp(prevExp => {
            return [...prevExp, {id: v4(), desc, total, budgetID}]
        })
    }

    function delBudget ( id ) {
        setBud(prevBud => {
            return prevBud.filter(budget => budget.id !== id )
        })
    }

    function delExpense ( id ) {
        setExp(prevExp => {
            return prevExp.filter(expense => expense.id !== id)
        })

    }

    return (
    <ItemContext.Provider value={{budgets, expenses, getBudExp, createBudget, createExpense, delBudget, delExpense}}>
        {children}
    </ItemContext.Provider>
    )
}