import React from "react"
import {
  Box,
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  IconButton,
} from "@chakra-ui/react"
import { useSelector, useDispatch } from "react-redux"

import { DeleteIcon } from "@chakra-ui/icons"

import { REMOVE_FROM_FAVORITES } from "../constants/favoritesConstants"

const FavoriteList = () => {
  const dispatch = useDispatch()

  const favoritesList = useSelector((state) => state.favoritesList)

  const handleDelete = (id) => {
    dispatch({ type: REMOVE_FROM_FAVORITES, payload: id })
  }

  return (
    <div style={{ marginTop: "4rem", marginBottom: "2rem" }}>
      <Container maxW='4xl' centerContent>
        <Box padding='4' bg='white' maxW='4xl' w='100%'>
          <Table variant='striped'>
            <TableCaption>Your saved currency conversions</TableCaption>
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>From $</Th>
                <Th isNumeric>Amount</Th>
                <Th>To $</Th>
                <Th isNumeric>Value</Th>
                <Th>Item Name</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {favoritesList.length === 0 ? <p>No Favorites Saved</p> : null}
              {favoritesList.map((item, i) => {
                return (
                  <Tr key={i}>
                    <Td>{item.date}</Td>
                    <Td>{item.fromCurrency}</Td>
                    <Td isNumeric>{item.fromAmount}</Td>
                    <Td>{item.toCurrency}</Td>
                    <Td isNumeric>{item.toAmount}</Td>
                    <Td>{item.itemName}</Td>
                    <Td>
                      <IconButton
                        size='sm'
                        colorScheme='red'
                        aria-label='Delete Conversion'
                        icon={<DeleteIcon />}
                        onClick={() => handleDelete(item)}
                      />
                    </Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </Box>
      </Container>
    </div>
  )
}

export default FavoriteList
