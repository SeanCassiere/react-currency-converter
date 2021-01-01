import React, { useState, useEffect } from "react"
import { currencies } from "../utils/currencies"
import { useDispatch } from "react-redux"

import axios from "axios"

import { ADD_TO_FAVORITES } from "../constants/favoritesConstants"

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
  Divider,
  Skeleton,
} from "@chakra-ui/react"

import { RepeatClockIcon, PlusSquareIcon, Search2Icon } from "@chakra-ui/icons"

const initialState = {
  fromCurrency: "USD",
  fromAmount: "0.00",
  toCurrency: "LKR",
  toAmount: "0.00",
  itemName: "",
}

const ExchangeCard = () => {
  const showDebugger = false

  const dispatch = useDispatch()

  const [rates, setRates] = useState({})

  const [fromCurrency, setFromCurrency] = useState(initialState.fromCurrency)
  const [fromAmount, setFromAmount] = useState(initialState.fromAmount)
  const [toCurrency, setToCurrency] = useState(initialState.toCurrency)
  const [toAmount, setToAmount] = useState(initialState.toAmount)
  const [itemName, setItemName] = useState(initialState.itemName)

  const [isLoading, setIsLoading] = useState(true)
  const [isSearching, setIsSearching] = useState(false)
  const [cannotSave, setCannotSave] = useState(true)

  const searchQuery = React.useCallback(async () => {
    setIsLoading(true)
    // https://open.exchangerate-api.com/v6/latest                                                  setRates(data.rates)
    // https://v6.exchangerate-api.com/v6/${process.env.REACT_APP_API_KEY}/latest/${fromCurrency}   setRates(data.conversion_rates)
    try {
      const req = await axios.get(
        `https://v6.exchangerate-api.com/v6/${process.env.REACT_APP_API_KEY}/latest/${fromCurrency}`
      )
      const { data } = req

      console.log("Running callback with Currency:", fromCurrency)
      // setRates(data.rates)
      setRates(data.conversion_rates)
    } catch (err) {
      return err
    }
    setIsLoading(false)
  }, [fromCurrency])

  const handleConversion = (value) => {
    setFromAmount(value)
    const converted_amount_raw = value * rates[`${toCurrency}`]
    const converted_amount = converted_amount_raw.toFixed(2)
    setToAmount(converted_amount)
  }

  useEffect(() => {
    setCannotSave(true)
    searchQuery(fromCurrency)
    // eslint-disable-next-line
  }, [fromCurrency])

  const handleSubmit = () => {
    setCannotSave(true)
    setIsSearching(true)
    console.log("submitting")
    setTimeout(() => {
      setIsSearching(false)
      setCannotSave(false)
    }, 1)
  }

  const handleSave = () => {
    const dateNow = new Date(Date.now())
    const formattedDate = dateNow.toLocaleString()
    const finalItemName = itemName || "<No Name>"
    const saveData = {
      fromCurrency,
      fromAmount,
      toCurrency,
      toAmount,
      itemName: finalItemName,
      date: formattedDate,
    }
    dispatch({ type: ADD_TO_FAVORITES, payload: saveData })
    setCannotSave(true)
    setFromCurrency(initialState.fromCurrency)
    setFromAmount(initialState.fromAmount)
    setToCurrency(initialState.toCurrency)
    setToAmount(initialState.toAmount)
    setItemName(initialState.itemName)
  }

  const handleReset = () => {
    setCannotSave(true)
    setFromCurrency(initialState.fromCurrency)
    setToCurrency(initialState.toCurrency)
    setFromAmount(initialState.fromAmount)
    setItemName(initialState.itemName)
  }

  return (
    <>
      <Container maxW='xs' centerContent className='exchangeCard' padding='0'>
        <Box padding='7' bg='white' w='100%'>
          <Center margin='2'>
            <Heading as='h1' size='xl'>
              CURRENCY CONVERTER
              <Divider />
            </Heading>
          </Center>

          <Grid templateColumns='repeat(12, 1fr)' gap={2}>
            <GridItem colSpan={5}>
              <FormControl id='from-currency'>
                <FormLabel>From</FormLabel>
                {isLoading ? (
                  <Skeleton height='40px' />
                ) : (
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
                )}
              </FormControl>
            </GridItem>
            <GridItem colSpan={7}>
              <FormControl id='from-amount'>
                <FormLabel>Amount</FormLabel>
                {isLoading ? (
                  <Skeleton height='40px' />
                ) : (
                  <NumberInput
                    value={fromAmount}
                    precision={2}
                    min={0}
                    onChange={(value) => handleConversion(value)}
                    autoComplete='off'
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                )}
              </FormControl>
            </GridItem>

            <GridItem colSpan={5}>
              <FormControl id='to-currency'>
                <FormLabel>To</FormLabel>
                {isLoading ? (
                  <Skeleton height='40px' />
                ) : (
                  <Select
                    variant='outline'
                    onChange={(e) => {
                      setToCurrency(e.target.value)
                      handleConversion(fromAmount)
                    }}
                    value={toCurrency}
                  >
                    {currencies.map((value) => (
                      <option value={value} key={value}>
                        {value}
                      </option>
                    ))}
                  </Select>
                )}
              </FormControl>
            </GridItem>

            <GridItem colSpan={7}>
              <FormControl id='to-value'>
                <FormLabel>Value</FormLabel>
                {isLoading ? (
                  <Skeleton height='40px' />
                ) : (
                  <NumberInput
                    value={toAmount}
                    precision={2}
                    min={0}
                    isReadOnly={true}
                  >
                    <NumberInputField />
                  </NumberInput>
                )}
              </FormControl>
            </GridItem>

            <GridItem colSpan={12}>
              <FormControl id='item-name'>
                {isLoading ? (
                  <>
                    <Skeleton height='40px' />
                    <FormHelperText>
                      We are still Loading the currency conversion rates.
                    </FormHelperText>
                  </>
                ) : (
                  <>
                    <Input
                      placeholder='Item Name'
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      autoComplete='off'
                    />
                    <FormHelperText>
                      Maybe this is a price conversion for a product?
                    </FormHelperText>
                  </>
                )}
              </FormControl>
            </GridItem>

            <GridItem colSpan={12}>
              {isLoading ? (
                <Skeleton height='40px' />
              ) : (
                <Button
                  leftIcon={<Search2Icon />}
                  colorScheme='teal'
                  variant='solid'
                  style={{ width: "100%" }}
                  onClick={handleSubmit}
                  isLoading={isSearching}
                >
                  Search
                </Button>
              )}
            </GridItem>

            <GridItem colSpan={5}>
              {isLoading ? (
                <Skeleton height='40px' />
              ) : (
                <Button
                  leftIcon={<RepeatClockIcon />}
                  colorScheme='pink'
                  variant='outline'
                  style={{ width: "100%" }}
                  onClick={handleReset}
                >
                  Reset
                </Button>
              )}
            </GridItem>

            <GridItem colSpan={7}>
              {isLoading ? (
                <Skeleton height='40px' />
              ) : (
                <Button
                  leftIcon={<PlusSquareIcon />}
                  colorScheme='teal'
                  variant='outline'
                  style={{ width: "100%" }}
                  onClick={handleSave}
                  disabled={cannotSave}
                >
                  Save
                </Button>
              )}
            </GridItem>
          </Grid>
        </Box>
      </Container>
    </>
  )
}

export default ExchangeCard
