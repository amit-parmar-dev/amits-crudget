import React, { useContext, useState } from 'react'
import { v4 } from 'uuid'
import useLocalStorage from '../hooks/useLocalStorage'

const ItemContext = React.createContext()

export const uncategorizedID = "Uncategorized"

export function useItemContext() {
    return useContext(ItemContext)
}


export const ItemContextProvider = ({children}) => {
    const [budgets, setBudgets] = useLocalStorage("budgets", [])
    const [expenses, setExpenses] = useLocalStorage("expenses", [])

    function getBudExp (budgetID) {
        return expenses.filter(expense => expense.budgetID === budgetID)
    }

    function createBudget ({ name, max }) {
        setBudgets(prevBud => {
            if (prevBud.find(budget => budget.name === name)) {
                return prevBud
            }
            return [...prevBud, {id: v4(), name, max}]
        })
    }
    
    function createExpense ({ desc, total, budgetID}) {
        setExpenses(prevExp => {
            return [...prevExp, {id: v4(), desc, total, budgetID}]
        })
    }

    function delBudget ({ id }) {
        setExpenses(prevExp => {
            return prevExp.map(expense => {
                if (expense.budgetId !== id) return expense
                return { ...expense, budgetId: uncategorizedID }
            })
        })
        setBudgets(prevBud => {
            return prevBud.filter(budget => budget.id !== id )
        })
    }

    function delExpense ({ id }) {
        setExpenses(prevExp => {
            return prevExp.filter(expense => expense.id !== id)
        })

    }

    return (
    <ItemContext.Provider value={{budgets, expenses, getBudExp, createBudget, createExpense, delBudget, delExpense}}>
        {children}
    </ItemContext.Provider>
    )
}