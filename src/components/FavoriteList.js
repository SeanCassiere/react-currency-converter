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
} from "@chakra-ui/react"
import { useSelector } from "react-redux"

const FavoriteList = () => {
  const favoritesList = useSelector((state) => state.favoritesList)
  return (
    <div style={{ marginTop: "4rem", marginBottom: "2rem" }}>
      <Container maxW='4xl' centerContent>
        <Box padding='4' bg='white' maxW='4xl' w='100%'>
          {console.log(favoritesList)}
          <p>{JSON.stringify(favoritesList)}</p>
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
              </Tr>
            </Thead>
            <Tbody>
              {favoritesList.map((item, i) => {
                const date = new Date(item.date)
                return (
                  <Tr key={i}>
                    <Td>{date.toLocaleDateString()}</Td>
                    <Td>{item.fromCurrency}</Td>
                    <Td isNumeric>{item.fromAmount}</Td>
                    <Td>{item.toCurrency}</Td>
                    <Td isNumeric>{item.toAmount}</Td>
                    <Td>{item.itemName}</Td>
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
