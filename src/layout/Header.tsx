import { useState, ChangeEvent, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FiSearch } from 'react-icons/fi'
import { MdDarkMode, MdLightMode, MdMessage, MdHelp } from 'react-icons/md'
import { IoIosNotifications } from 'react-icons/io'
import { Input, IconButton, FlexBetween } from 'styles/ReuseableComponent'
import { getSearchResult } from 'apis/searchApi'
import { SearchResultType } from 'types/searchType'
import SearchResult from 'components/common/SearchResult'
import useModeContext from 'context/hooks/useModeContext'

const Header = () => {
  const [searchText, setSearchText] = useState<string>('')
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const [searchResult, setSearchResult] = useState<SearchResultType>({ users: [], posts: [] })

  const { mode, changeMode } = useModeContext()

  const changeSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  const search = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await getSearchResult({ searchText })
    if (!response) return
    setIsDropdownOpen(true)
    setSearchResult(response.results)
  }

  const toggleMode = () => {
    changeMode()
  }

  const checkNotification = () => {}

  const checkMessage = () => {}

  const checkHelp = () => {}

  return (
    <HeaderLayout>
      <div>
        <LogoBox>
          <Link to='/' className='logo'>
            <h1>SOCIOPEDIA</h1>
          </Link>
          <SearchSection onSubmit={search} $isDropdownOpen={isDropdownOpen}>
            <Input onChange={changeSearchText} placeholder='search...' />
            <IconButton type='submit'>
              <FiSearch className='icon' />
            </IconButton>
            <SearchResult
              isDropdownOpen={isDropdownOpen}
              setIsDropdownOpen={setIsDropdownOpen}
              searchResult={searchResult}
            />
          </SearchSection>
        </LogoBox>
        <MenuBox>
          <IconButton onClick={toggleMode}>
            {mode === 'dark' ? <MdLightMode className='icon' /> : <MdDarkMode className='icon' />}
          </IconButton>
          <IconButton onClick={checkNotification}>
            <IoIosNotifications className='icon' />
          </IconButton>
          <IconButton onClick={checkMessage}>
            <MdMessage className='icon' />
          </IconButton>
          <IconButton onClick={checkHelp}>
            <MdHelp className='icon' />
          </IconButton>
        </MenuBox>
      </div>
    </HeaderLayout>
  )
}

export default Header

const HeaderLayout = styled(FlexBetween)`
  background: ${({ theme }) => theme.background.alt};
  height: 90px;
  width: 100%;

  & > div:nth-child(1) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 72px;
    width: 100%;
  }

  .icon {
    font-size: 24px;
  }
`

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  .logo {
    text-decoration: none;

    h1 {
      color: ${({ theme }) => theme.primary.main};
      font-size: 32px;
    }
  }
`

const SearchSection = styled.form<{ $isDropdownOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.neutral.light};
  border-radius: ${({ $isDropdownOpen }) => ($isDropdownOpen ? '8px 8px 0 0' : '8px')};
  height: 40px;
  width: ${({ $isDropdownOpen }) => ($isDropdownOpen ? '640px' : '240px')};
  gap: 4px;
  position: relative;

  & > input {
    margin-left: 16px;
  }

  & > button {
    box-shadow: none;
    border-radius: 50%;
    margin-right: 8px;
  }

  & > button:hover {
    color: ${({ theme }) => theme.primary.main};
    background: none;
  }
`

const MenuBox = styled.div`
  display: flex;
  gap: 20px;
`
