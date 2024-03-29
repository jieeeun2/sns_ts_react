import { axiosInstance } from 'configs/axiosInstance'
import { GetSearchResult } from 'types/searchApiType'

export const getSearchResult = async ({ searchText }: GetSearchResult) => {
  try {
    const response = await axiosInstance('/search', {
      method: 'POST',
      data: { searchText },
    })

    return response.data.data
  } catch (error) {
    console.log(error)
  }
}
