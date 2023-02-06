import * as React from 'react';
import { createTheme, Button, Container, Grid, NextUIProvider, Text } from '@nextui-org/react';
import { Stack } from 'react-bootstrap';
import ItemCard from './components/ItemCard';
import CreateBudgetModal from './components/CreateBudgetModal';
import { useState } from 'react';
import { uncategorizedID, useItemContext } from './contexts/ItemContext';
import CreateExpenseModal from './components/CreateExpenseModal';
import ViewExpensesModal from './components/ViewExpensesModal';
import UncategorizedItemCard from './components/UncategorizedItemCard'
import TotalItemCard from './components/TotalItemCard';


function App() {
  const [modalVisible, setModalVisible] = useState(false)
  const [expenseModalVisible, setExpenseModalVisible] = useState(false)
  const [openExpenseModalB, setOpenExpenseModalB] = useState()
  const [viewExpensesModalB, setViewExpensesModalB] = useState()

  const { budgets, getBudExp } = useItemContext()

  function openExpenseModal(budgetId) {
    setExpenseModalVisible(true)
    setOpenExpenseModalB(budgetId)
  }



  return <div style={{backgroundColor : "black"}}>
  <NextUIProvider theme={createTheme({type: "dark"})}>
    <Container className='my-4'>

      <Stack direction="horizontal" gap="3" className="mx-2">
        <Text h1 color='secondary' className="me-auto ">Amit's Budget App</Text>
        <Button auto color="secondary" onPress={() => setModalVisible(true)}>Create Budget</Button>
        <Button auto bordered color="secondary" onPress={openExpenseModal}>Create Expense</Button>
      </Stack>

      <Grid.Container className='my-4' gap={3} justify="center" alignItems='flex-start'>
          {budgets.map(budget => {
            const total = getBudExp(budget.id).reduce((total, expense) => total + expense.total, 0)
            return(
              <Grid>
              <ItemCard onViewExpensesClick={() => setViewExpensesModalB(budget.id)} onCreateExpenseClick={() => openExpenseModal(budget.id)} key={budget.id} itemName={budget.name} total={total} max={budget.max}/>
              </Grid>
            )
          })}
          <Grid>
          <UncategorizedItemCard onViewExpensesClick={() => setViewExpensesModalB(uncategorizedID)} onCreateExpenseClick={openExpenseModal}/>
          </Grid>
          <Grid>
          <TotalItemCard/>
          </Grid>
      </Grid.Container>
    </Container>
    <CreateBudgetModal visible={modalVisible} closeHandler={() => setModalVisible(false)}></CreateBudgetModal>
    <CreateExpenseModal defaultBudgetID={openExpenseModalB} visible={expenseModalVisible} closeHandler={() => setExpenseModalVisible(false)}></CreateExpenseModal>
    <ViewExpensesModal budgetId={viewExpensesModalB} closeHandler={() => setViewExpensesModalB()}></ViewExpensesModal>
  </NextUIProvider>;
  </div>
}

export default App;
