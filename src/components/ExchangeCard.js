import React, { useState } from "react"

import {
  Box,
  Container,
  Heading,
  Center,
  Select,
  Grid,
  GridItem,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  Input,
  FormHelperText,
  Button,
  FormLabel,
} from "@chakra-ui/react"

import { RepeatClockIcon, PlusSquareIcon } from "@chakra-ui/icons"

const ExchangeCard = () => {
  const showDebugger = false

  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("USD")
  const [fromAmount, setFromAmount] = useState("0.00")
  const [itemName, setItemName] = useState("")

  return (
    <Container maxW='xs' centerContent className='exchangeCard' padding='0'>
      <Box padding='10' bg='white' w='100%'>
        <Center margin='2'>
          <Heading as='h1' size='xl'>
            CURRENCY CONVERTER
          </Heading>
        </Center>

        <Grid templateColumns='repeat(12, 1fr)' gap={3}>
          <GridItem colSpan={5}>
            <FormControl id='from-currency'>
              <FormLabel>From</FormLabel>
              <Select
                variant='outline'
                onChange={(e) => setFromCurrency(e.target.value)}
              >
                <option value='USD'>USD</option>
                <option value='LKR'>LKR</option>
              </Select>
            </FormControl>
          </GridItem>
          <GridItem colSpan={7}>
            <FormControl id='from-amount'>
              <FormLabel>Amount</FormLabel>
              <NumberInput
                defaultValue={fromAmount}
                precision={2}
                min={0}
                onChange={(value) => setFromAmount(value)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </GridItem>

          <GridItem colSpan={5}>
            <FormControl id='to-currency'>
              <FormLabel>To</FormLabel>
              <Select
                variant='outline'
                onChange={(e) => setToCurrency(e.target.value)}
              >
                <option value='USD'>USD</option>
                <option value='LKR'>LKR</option>
              </Select>
            </FormControl>
          </GridItem>

          <GridItem colSpan={7}>
            <FormControl id='to-value'>
              <FormLabel>Value</FormLabel>
              <NumberInput defaultValue={15} precision={2} min={0}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </GridItem>

          <GridItem colSpan={12}>
            <FormControl id='item-name'>
              <Input
                placeholder='Item Name'
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
              <FormHelperText>
                Maybe this is a price conversion for a product?
              </FormHelperText>
            </FormControl>
          </GridItem>

          <GridItem colSpan={5}>
            <Button
              leftIcon={<RepeatClockIcon />}
              colorScheme='pink'
              variant='outline'
              style={{ width: "100%" }}
            >
              Reset
            </Button>
          </GridItem>

          <GridItem colSpan={7}>
            <Button
              leftIcon={<PlusSquareIcon />}
              colorScheme='teal'
              variant='solid'
              style={{ width: "100%" }}
            >
              Save
            </Button>
          </GridItem>
        </Grid>
        {showDebugger ? (
          <div>
            <p>
              <br />
            </p>
            <p>
              From Currency: {fromCurrency}, From Amount: {fromAmount}
            </p>
            <p>To Currency: {toCurrency}</p>
            <p>Item Name: {itemName}</p>
          </div>
        ) : null}
      </Box>
    </Container>
  )
}

export default ExchangeCard
