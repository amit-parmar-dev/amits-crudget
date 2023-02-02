
import * as React from 'react';

// 1. import `NextUIProvider` component
import { createTheme, Button, Container, Grid, NextUIProvider, Text } from '@nextui-org/react';
import { Stack } from 'react-bootstrap';
import ItemCard from './components/ItemCard';
import CreateBudgetModal from './components/CreateBudgetModal';
import { useState } from 'react';
import { useItemContext } from './contexts/ItemContext';
import CreateExpenseModal from './components/CreateExpenseModal';


function App() {
  const [modalVisible, setModalVisible] = useState(false)
  const { budgets, expenses, getBudExp } = useItemContext()

  return <div style={{backgroundColor : "black"}}>
  <NextUIProvider theme={createTheme({type: "dark"})}>
    <Container className='my-4'>

      <Stack direction="horizontal" gap="3" className="mx-2">
        <Text h1 color='secondary' className="me-auto ">Amit's Budget App</Text>
        <Button auto color="secondary" onPress={() => setModalVisible(true)}>Create Budget</Button>
        <Button auto bordered color="secondary">Create Expense</Button>
      </Stack>

      <Grid.Container gap={2} justify="center" alignItems='flex-start'>
        <Grid>
          {budgets.map(budget => {
            const total = getBudExp(budget.id).reduce((total, expense) => total + expense.total, 0)
            return(
              <ItemCard key={budget.id} itemName={budget.name} total={0} max={budget.max}/>
            )
          })}
        </Grid>    
      </Grid.Container>

    </Container>
    <CreateBudgetModal visible={modalVisible} closeHandler={() => setModalVisible(false)}></CreateBudgetModal>
    <CreateExpenseModal visible={modalVisible} closeHandler={() => setModalVisible(false)}></CreateExpenseModal>
  </NextUIProvider>;
  </div>
}

export default App;
