import { Button, Input, Modal, Spacer, Text } from "@nextui-org/react";
import { useRef } from "react";
import { useItemContext } from "../contexts/ItemContext";

export default function CreateBudgetModal({visible, closeHandler}) {
  const nameRef = useRef()
  const totalRef = useRef()
  const { createBudget } = useItemContext()
  
  function submitHandler(e) {
    createBudget(
    {
    name: nameRef.current.value,
    max: parseFloat(totalRef.current.value)
    })
    closeHandler()
  }

  return (
    <Modal open={visible} onClose={closeHandler} closeButton animated>
        <Modal.Header>
          <Text id="modal-title">Create Budget</Text>
        </Modal.Header>
        <Modal.Body>
            <Spacer y={0.5}/>
            <Input ref={nameRef} labelPlaceholder="Item Name" required underlined type={"text"}/>
            <Spacer y={0.5}/>
            <Input ref={totalRef} labelPlaceholder="Total Allowance" required underlined type={"number"} min={0} step={0.01}/>
        </Modal.Body>
        <Modal.Footer>
            <div className="d-flex justify-content-end">
                <Button color={"secondary"} type="submit" onPress={submitHandler}>Create Budget</Button>
            </div>
        </Modal.Footer>
    </Modal>
  )
}
