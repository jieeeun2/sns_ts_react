import { createAsyncThunk } from '@reduxjs/toolkit'
import { search } from 'apis/searchApi'
import { Search } from 'types/searchApiType'

export const searchThunk = createAsyncThunk('search/search', async ({ searchText }: Search) => {
  try {
    const response = await search({ searchText })

    return response
  } catch (error) {
    console.log(error)
  }
})
