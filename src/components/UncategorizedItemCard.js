import { uncategorizedID, useItemContext } from "../contexts/ItemContext";
import ItemCard from "./ItemCard";

export default function UncategorizedItemCard(props) {
  const { getBudExp } = useItemContext()
  const total = getBudExp(uncategorizedID).reduce((total, expense) => total + expense.total, 0)
  
  if (total === 0) return null

  return (
    <ItemCard total={total} bground itemName={"Uncategorized"} {...props} />
  )
}
