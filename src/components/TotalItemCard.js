import { useItemContext } from "../contexts/ItemContext";
import ItemCard from "./ItemCard";

export default function TotalItemCard() {
  const { expenses, budgets } = useItemContext()
  const total = expenses.reduce((total, expense) => total + expense.total, 0)
  
  const max = budgets.reduce((total, budget) => total + budget.max, 0)
  
  if (max === 0) return null

  return (
    <ItemCard hideButtons total={total} bground itemName={"Total"} max={max}/>
  )
}
