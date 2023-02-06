import { Button, Dropdown, Input, Modal, Spacer, Text } from "@nextui-org/react";
import { useRef, useState } from "react";
import { useItemContext, uncategorizedID } from "../contexts/ItemContext";

export default function CreateExpenseModal({visible, closeHandler, defaultBudgetID}) {
  const [selected, setSelected] = useState(new Set(["Choose Budget"]))
  const { createExpense, budgets } = useItemContext()
  const descRef = useRef()
  const totalRef = useRef()
  const budgetIDRef = useRef()
  
  function submitHandler() {
    createExpense(
    {
    desc: descRef.current.value,
    total: parseFloat(totalRef.current.value),
    budgetID: selected.currentKey
    })
    closeHandler()
  }

  return (
    <Modal open={visible} onClose={closeHandler} closeButton animated>
        <Modal.Header>
          <Text id="modal-title">Create Expense</Text>
        </Modal.Header>
        <Modal.Body>
            <Spacer y={0.5}/>
            <Input ref={descRef} labelPlaceholder="Expense Description" required underlined type={"text"}/>
            <Spacer y={0.5}/>
            <Input ref={totalRef} labelPlaceholder="Amount" required underlined type={"number"} min={0} step={0.01}/>
            <Spacer y={0.5}/>
            <Dropdown>
                <Dropdown.Button color="secondary">Choose Budget</Dropdown.Button>
                <Dropdown.Menu ref={budgetIDRef} selectionMode="single" selectedKeys={selected} onSelectionChange={setSelected} disallowEmptySelection aria-label="Multiple selection actions">
                    <Dropdown.Item key={uncategorizedID}>Uncategorized</Dropdown.Item>
                    {budgets.map(budget => (
                        <Dropdown.Item key={budget.id}>{budget.name}</Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </Modal.Body>
        <Modal.Footer>
            <div className="d-flex justify-content-end">
                <Button color={"secondary"} type="submit" onPress={submitHandler}>Create Expense</Button>
            </div>
        </Modal.Footer>
    </Modal>
  )
}
