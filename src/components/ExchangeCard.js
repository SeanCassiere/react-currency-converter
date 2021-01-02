import React, { useState, useEffect, useCallback } from "react"
import { currencies } from "../utils/currencies"
import { useDispatch } from "react-redux"

import axios from "axios"

import { ADD_TO_FAVORITES } from "../constants/favoritesConstants"

import {
  Alert,
  AlertIcon,
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

import { RepeatClockIcon, PlusSquareIcon } from "@chakra-ui/icons"

const initialState = {
  fromCurrency: "USD",
  fromAmount: "0.00",
  toCurrency: "LKR",
  toAmount: "0.00",
  itemName: "",
}

// This is the heights used for the Skeleton loading animations
const skeleton = { fullHeight: "47px", errorHeight: "20px" }

// ExchangeCard Component
const ExchangeCard = () => {
  const dispatch = useDispatch()

  const [rates, setRates] = useState({})

  const [fromCurrency, setFromCurrency] = useState(initialState.fromCurrency)
  const [fromAmount, setFromAmount] = useState(initialState.fromAmount)
  const [toCurrency, setToCurrency] = useState(initialState.toCurrency)
  const [toAmount, setToAmount] = useState(initialState.toAmount)
  const [itemName, setItemName] = useState(initialState.itemName)

  const [isLoading, setIsLoading] = useState(true)
  const [cannotSave, setCannotSave] = useState(true)
  const [isError, setIsError] = useState(false)

  const searchQuery = useCallback(async () => {
    setIsLoading(true)
    // Used for Testing:    https://open.exchangerate-api.com/v6/latest                                                  setRates(data.rates)
    // Used for Production: https://v6.exchangerate-api.com/v6/${process.env.REACT_APP_API_KEY}/latest/${fromCurrency}   setRates(data.conversion_rates)
    try {
      const req = await axios.get(`https://open.exchangerate-api.com/v6/latest`)
      const { data } = req

      console.log("Running callback with Currency:", fromCurrency)
      setRates(data.rates)
      setIsLoading(false)
    } catch (err) {
      console.error(err)
      setIsError(true)
      setIsLoading(true)
    }
  }, [fromCurrency])

  useEffect(() => {
    setCannotSave(true)
    searchQuery(fromCurrency)
    // eslint-disable-next-line
  }, [fromCurrency])

  const resetState = () => {
    setFromCurrency(initialState.fromCurrency)
    setFromAmount(initialState.fromAmount)
    setToCurrency(initialState.toCurrency)
    setToAmount(initialState.toAmount)
    setItemName(initialState.itemName)
  }

  const handleConversion = (value, currency) => {
    setFromAmount(value)
    const converted_amount_raw = value * rates[`${currency}`]
    const converted_amount = converted_amount_raw.toFixed(2)

    setToAmount(converted_amount)
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
    resetState()
  }

  const handleReset = () => {
    setCannotSave(true)
    resetState()
  }

  return (
    <>
      <Container
        maxW='xs'
        centerContent
        className='shallowFloatingCard home-exchangeCard'
        padding='0'
      >
        <Box padding='7' bg='white' w='100%'>
          <Center margin='2'>
            <Heading as='h1' size='xl'>
              CURRENCY CONVERTER
              <Divider />
            </Heading>
          </Center>

          {isError && (
            <Box>
              <Alert status='error'>
                <AlertIcon />
                There was a network error.
              </Alert>
            </Box>
          )}

          <Grid templateColumns='repeat(12, 1fr)' gap={2}>
            <GridItem colSpan={5}>
              <FormControl id='from-currency'>
                <FormLabel>From</FormLabel>
                <Skeleton
                  height={!isError ? skeleton.fullHeight : skeleton.errorHeight}
                  isLoaded={!isLoading}
                >
                  <Select
                    size='lg'
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
                </Skeleton>
              </FormControl>
            </GridItem>
            <GridItem colSpan={7}>
              <FormControl id='from-amount'>
                <FormLabel>Amount</FormLabel>
                <Skeleton
                  height={!isError ? skeleton.fullHeight : skeleton.errorHeight}
                  isLoaded={!isLoading}
                >
                  <NumberInput
                    size='lg'
                    value={fromAmount}
                    precision={2}
                    min={0}
                    onChange={(value) => {
                      handleConversion(value, toCurrency)
                      if (value > 0) {
                        setCannotSave(false)
                      } else {
                        setCannotSave(true)
                      }
                    }}
                    autoComplete='off'
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Skeleton>
              </FormControl>
            </GridItem>

            <GridItem colSpan={5}>
              <FormControl id='to-currency'>
                <FormLabel>To</FormLabel>
                <Skeleton
                  height={!isError ? skeleton.fullHeight : skeleton.errorHeight}
                  isLoaded={!isLoading}
                >
                  <Select
                    size='lg'
                    variant='outline'
                    onChange={(e) => {
                      setToCurrency(e.target.value)
                      handleConversion(fromAmount, e.target.value)
                    }}
                    value={toCurrency}
                  >
                    {currencies.map((value) => (
                      <option value={value} key={value}>
                        {value}
                      </option>
                    ))}
                  </Select>
                </Skeleton>
              </FormControl>
            </GridItem>

            <GridItem colSpan={7}>
              <FormControl id='to-value'>
                <FormLabel>Value</FormLabel>
                <Skeleton
                  height={!isError ? skeleton.fullHeight : skeleton.errorHeight}
                  isLoaded={!isLoading}
                >
                  <NumberInput
                    size='lg'
                    value={toAmount}
                    precision={2}
                    min={0}
                    isReadOnly={true}
                  >
                    <NumberInputField />
                  </NumberInput>
                </Skeleton>
              </FormControl>
            </GridItem>

            <GridItem colSpan={12}>
              <FormControl id='item-name'>
                <FormLabel>Item Name</FormLabel>
                <Skeleton
                  height={!isError ? skeleton.fullHeight : skeleton.errorHeight}
                  isLoaded={!isLoading}
                >
                  <Input
                    placeholder='eg: Phone, Laptop, etc...'
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    autoComplete='off'
                  />
                </Skeleton>
                <FormHelperText>
                  {!isLoading
                    ? "Maybe this is a price conversion for a product?"
                    : !isError
                    ? "We are still Loading the currency conversion rates."
                    : "There was an error while connecting to the API."}
                </FormHelperText>
              </FormControl>
            </GridItem>

            <GridItem colSpan={5}>
              <Skeleton
                height={!isError ? skeleton.fullHeight : skeleton.errorHeight}
                isLoaded={!isLoading}
              >
                <Button
                  leftIcon={<RepeatClockIcon />}
                  colorScheme='pink'
                  variant='outline'
                  style={{ width: "100%" }}
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </Skeleton>
            </GridItem>

            <GridItem colSpan={7}>
              <Skeleton
                height={!isError ? skeleton.fullHeight : skeleton.errorHeight}
                isLoaded={!isLoading}
              >
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
              </Skeleton>
            </GridItem>
          </Grid>
        </Box>
      </Container>
    </>
  )
}

export default ExchangeCard
