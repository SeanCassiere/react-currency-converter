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

const initialState = {
  fromCurrency: "USD",
  toCurrency: "USD",
  fromAmount: "0.00",
  itemName: "",
}

const currencies = ["DKK", "MYR", "USD", "LKR", "GBP"]

const ExchangeCard = () => {
  const showDebugger = false

  const [fromCurrency, setFromCurrency] = useState(initialState.fromCurrency)
  const [toCurrency, setToCurrency] = useState(initialState.toCurrency)
  const [fromAmount, setFromAmount] = useState(initialState.fromAmount)
  const [itemName, setItemName] = useState(initialState.itemName)

  const handleSubmit = () => {
    console.log("submitting")
  }

  const handleReset = () => {
    setFromCurrency(initialState.fromCurrency)
    setToCurrency(initialState.toCurrency)
    setFromAmount(initialState.fromAmount)
    setItemName(initialState.itemName)
    console.log("Form Reset")
  }

  return (
    <Container maxW='xs' centerContent className='exchangeCard' padding='0'>
      <Box padding='7' bg='white' w='100%'>
        <Center margin='2'>
          <Heading as='h1' size='xl'>
            CURRENCY CONVERTER
          </Heading>
        </Center>

        <Grid templateColumns='repeat(12, 1fr)' gap={2}>
          <GridItem colSpan={5}>
            <FormControl id='from-currency'>
              <FormLabel>From</FormLabel>
              <Select
                variant='outline'
                onChange={(e) => setFromCurrency(e.target.value)}
                value={fromCurrency}
              >
                {currencies.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </Select>
            </FormControl>
          </GridItem>
          <GridItem colSpan={7}>
            <FormControl id='from-amount'>
              <FormLabel>Amount</FormLabel>
              <NumberInput
                value={fromAmount}
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
                value={toCurrency}
              >
                {currencies.map((value) => (
                  <option value={value} key={value}>
                    {value}
                  </option>
                ))}
              </Select>
            </FormControl>
          </GridItem>

          <GridItem colSpan={7}>
            <FormControl id='to-value'>
              <FormLabel>Value</FormLabel>
              <NumberInput
                defaultValue={0.0}
                precision={2}
                min={0}
                isReadOnly={true}
              >
                <NumberInputField />
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
              onClick={handleReset}
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
              onClick={handleSubmit}
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
