import React from "react"

import {
  Badge,
  Box,
  Divider,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Text,
} from "@chakra-ui/react"

import { DeleteIcon } from "@chakra-ui/icons"

const FavoriteCardItem = ({ item, handleDelete, index }) => {
  return (
    <GridItem colSpan={1} w='100%'>
      <Box
        w='100%'
        bg='#FAF9F9'
        className='shallowFloatingCard favoriteItemCard'
        padding='2'
      >
        <Grid templateColumns='repeat(12, 1fr)' gap={1}>
          <GridItem colSpan={10}>
            <Badge
              variant={index === 0 ? "solid" : "outline"}
              colorScheme='green'
            >
              {item.date}
            </Badge>
          </GridItem>
          <GridItem colSpan={2} style={{ textAlign: "right" }}>
            <IconButton
              size='sm'
              colorScheme='red'
              aria-label='Delete Conversion'
              icon={<DeleteIcon />}
              onClick={() => handleDelete(item)}
            />
          </GridItem>
          <GridItem colSpan={6}>
            <Heading as='div' size='md'>
              {item.fromCurrency}
            </Heading>
          </GridItem>
          <GridItem colSpan={6}>
            <Heading as='div' size='md'>
              {item.toCurrency}
            </Heading>
          </GridItem>
          <GridItem colSpan={6}>
            <Text
              as='div'
              fontSize='20px'
              style={{ fontWeight: "700" }}
              isTruncated
            >
              {item.fromAmount}
            </Text>
          </GridItem>
          <GridItem colSpan={6}>
            <Text
              as='div'
              fontSize='20px'
              style={{ fontWeight: "700" }}
              isTruncated
            >
              {item.toAmount}
            </Text>
          </GridItem>
          <GridItem colSpan={12}>
            <Divider />
          </GridItem>
          <GridItem colSpan={12}>
            <Text isTruncated>{item.itemName}</Text>
          </GridItem>
        </Grid>
      </Box>
    </GridItem>
  )
}

export default FavoriteCardItem
