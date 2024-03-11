import { axiosInstance } from 'configs/axiosInstance'
import { Search } from 'types/searchApiType'

export const search = async ({ searchText }: Search) => {
  try {
    const response = await axiosInstance('/search', {
      method: 'POST',
      data: { searchText },
    })

    console.log('response.data.data', response.data.data)
    return response.data.data
  } catch (error) {
    console.log(error)
  }
}
