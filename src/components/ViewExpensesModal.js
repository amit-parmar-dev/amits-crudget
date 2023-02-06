import { Button, Modal, Spacer, Text } from "@nextui-org/react";
import { Stack } from "react-bootstrap";
import { uncategorizedID, useItemContext } from "../contexts/ItemContext";
import { currency } from "../utilityCode";

export default function ViewExpensesModal({budgetId, closeHandler}) {

  const { getBudExp, budgets, delBudget, delExpense } = useItemContext()
  
  const expenses = getBudExp(budgetId)
  
  const budget = 
    uncategorizedID === budgetId 
      ? { name: "Uncategorized", id : uncategorizedID } 
      : budgets.find(budget => budget.id === budgetId)

  return (
    <Modal open={budgetId != null} onClose={closeHandler} animated>
        <Modal.Header>
          <Text className="my-3 d-flex" h6 >Expenses under {budget?.name}</Text>
          <Spacer x={2}/>
          {budgetId !== uncategorizedID && (
            <Button onPress={() => {
              delBudget(budget)
              closeHandler()
            }} color={"error"} auto bordered>Delete Budget</Button>
          )}
        </Modal.Header>
        <Modal.Body>
          <Stack direction="vertical" gap="3">
            {expenses.map(expense => (
              <Stack direction="horizontal" gap="2" key={expense.id}>
                <div className="me-auto fs-5">{expense.desc}</div>
                <div className="fs-6">{currency.format(expense.total)}</div>
                <Button onPress={() => delExpense(expense)} size={"sm"} auto bordered color={"error"}>x</Button>
              </Stack>
            ))}
          </Stack>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
    </Modal>
  )
}
