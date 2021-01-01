import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import {
  Box,
  Container,
  Center,
  IconButton,
  Grid,
  GridItem,
  Heading,
} from "@chakra-ui/react"
import { DeleteIcon } from "@chakra-ui/icons"

import {
  LIST_ALL_FAVORITES,
  REMOVE_FROM_FAVORITES,
} from "../constants/favoritesConstants"

const FavoriteList = () => {
  const dispatch = useDispatch()

  const favoritesList = useSelector((state) => state.favoritesList)

  const handleDelete = (id) => {
    dispatch({ type: REMOVE_FROM_FAVORITES, payload: id })
  }

  useEffect(() => {
    dispatch({ type: LIST_ALL_FAVORITES })
  }, [dispatch])

  return (
    <div style={{ marginTop: "4rem", marginBottom: "4rem" }}>
      <Center>
        <Container
          maxW={{ sm: "30em", md: "80vw" }}
          margin={{ sm: "2rem", md: "2" }}
          center
        >
          <Box w='100%' style={{ marginBottom: "1.5rem" }}>
            <Center>
              <Heading as='h1' size='lg'>
                PAST SAVED CONVERSIONS
              </Heading>
            </Center>
          </Box>

          <Grid
            templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
            gap={3}
            margin='2'
          >
            {favoritesList.map((item, i) => {
              return (
                <GridItem colSpan={1} margin='1' key={i}>
                  <Box
                    w='100%'
                    bg='gray.100'
                    className='favoriteCard'
                    padding='2'
                  >
                    <Grid templateColumns='repeat(12, 1fr)' gap={0}>
                      <GridItem colSpan={10}>{item.date}</GridItem>
                      <GridItem colSpan={2} style={{ textAlign: "right" }}>
                        <IconButton
                          size='sm'
                          colorScheme='red'
                          aria-label='Delete Conversion'
                          icon={<DeleteIcon />}
                          onClick={() => handleDelete(item)}
                        />
                      </GridItem>
                      <GridItem colSpan={6}>{item.fromCurrency}</GridItem>
                      <GridItem colSpan={6}>{item.toCurrency}</GridItem>
                      <GridItem colSpan={6}>{item.fromAmount}</GridItem>
                      <GridItem colSpan={6}>{item.toAmount}</GridItem>
                      <GridItem colSpan={12}>{item.itemName}</GridItem>
                    </Grid>
                  </Box>
                </GridItem>
              )
            })}
          </Grid>
        </Container>
        <br />
        <br />
        <br />
        <br />
        <br />
      </Center>
    </div>
  )
}

export default FavoriteList
