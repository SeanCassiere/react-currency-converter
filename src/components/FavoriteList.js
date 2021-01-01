import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import {
  Box,
  Container,
  Center,
  Grid,
  Heading,
  Alert,
  AlertIcon,
} from "@chakra-ui/react"

import {
  LIST_ALL_FAVORITES,
  REMOVE_FROM_FAVORITES,
} from "../constants/favoritesConstants"

import FavoriteCardItem from "../components/FavoriteCardItem"

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
    <div className='favoriteList'>
      <Center>
        <Container
          maxW={{ sm: "30em", md: "70vw" }}
          margin={{ sm: "2rem", md: "2" }}
          centerContent
        >
          <Box w='100%' style={{ marginBottom: "2rem" }}>
            <Center>
              <Heading as='h1' size='lg'>
                PAST SAVED CONVERSIONS
              </Heading>
            </Center>
          </Box>
          {favoritesList.length === 0 ? (
            <Box>
              <Alert status='warning'>
                <AlertIcon />
                Seems you haven't saved any of your previous currency
                conversions.
              </Alert>
            </Box>
          ) : (
            <Grid
              w='100'
              templateColumns={{
                sm: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
                xl: "repeat(4, 1fr)",
              }}
              gap={7}
              className='home-favoriteList-mb'
            >
              {favoritesList.map((item, i) => {
                return (
                  <FavoriteCardItem
                    key={i}
                    item={item}
                    index={i}
                    handleDelete={handleDelete}
                  />
                )
              })}
            </Grid>
          )}
        </Container>
      </Center>
    </div>
  )
}

export default FavoriteList
