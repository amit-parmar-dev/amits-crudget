import { Button, Card, Progress } from "@nextui-org/react";
import { currency } from "../utilityCode";
import { Text } from "@nextui-org/react";


export default function ItemCard({ itemName, total, max, bground }) {
  const classNames = []
  if (total > max){
    classNames.push("bg-danger", "bg-opacity-10")
  }  else if (bground) {
    classNames.push("")
  }

  return (
    <Card css={{minWidth : "400px"}} variant="bordered" className={classNames.join(" ")}>
      <Card.Header css={{pb : "$0"}} className="d-flex align-items-baseline justify-content-between">
          <Text weight="medium" size={24} color="secondary">{itemName}</Text>
          <Text size={20} weight="normal">
            <div className="align-items-baseline d-flex">
            <Text weight="semibold" size={20} className="mx-1">{currency.format(total)}</Text> 
            / {currency.format(max)}
            </div>
          </Text>
      </Card.Header>
      <Card.Body css={{py : "$0"}}>
        <Progress 
          className = "mb-4" 
          striped value = {total} 
          max = {max} 
          color = {progBarColor(total, max)} 
          status = {progBarColor(total, max)}
        />
      </Card.Body>
      <Card.Divider/>
      <Card.Footer>
        <Button.Group bordered color="neutral" className="ms-auto">
          <Button>Create Expense</Button>
          <Button>View Expenses</Button>
        </Button.Group>
      </Card.Footer>
    </Card>
  )
}

function progBarColor(total, max) {
  const level = total / max
  if (level < 0.6) return "secondary"
  if (level < 0.8) return "warning"
  return "error"
}