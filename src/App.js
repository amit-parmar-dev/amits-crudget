
import * as React from 'react';

// 1. import `NextUIProvider` component
import { createTheme, Button, Container, Grid, NextUIProvider, Text } from '@nextui-org/react';
import { Stack } from 'react-bootstrap';
import ItemCard from './components/ItemCard';

function App() {
  // 2. Use at the root of your app
  return <div style={{backgroundColor : "black"}}>
  <NextUIProvider theme={createTheme({type: "dark"})}>
    <Container className='my-4'>

      <Stack direction="horizontal" gap="3" className="mx-2">
        <Text h1 color='secondary' className="me-auto ">Amit's Budget App</Text>
        <Button auto color="secondary">Create Budget</Button>
        <Button auto bordered color="secondary">Create Expense</Button>
      </Stack>

      <Grid.Container gap={2} justify="center" alignItems='flex-start'>
        <Grid>
          <ItemCard itemName="Entertainment" total={800} max={1000}></ItemCard>   
        </Grid>    
      </Grid.Container>

    </Container>
  </NextUIProvider>;
  </div>
}

export default App;
