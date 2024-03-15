import { useState, ChangeEvent } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FiSearch } from 'react-icons/fi'
import { MdDarkMode, MdLightMode, MdMessage, MdHelp } from 'react-icons/md'
import { IoIosNotifications } from 'react-icons/io'
import { useAppDispatch, useAppSelector } from 'store'
import { setMode } from 'store/slices/modeSlice'
import { Input, IconButton, FlexBetween } from 'styles/ReuseableComponent'
import { searchThunk } from 'store/thunks/searchThunks'
import SearchResultList from 'components/common/SearchResultList'

const Header = () => {
  const [searchText, setSearchText] = useState<string>('')
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)

  const mode = useAppSelector((state) => state.mode.mode)
  const dispatch = useAppDispatch()

  const changeSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  const search = () => {
    dispatch(searchThunk({ searchText })).then(() => setIsDropdownOpen(true))
  }

  const changeMode = () => {
    dispatch(setMode())
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
          <SearchSection $isDropdownOpen={isDropdownOpen}>
            <Input onChange={changeSearchText} placeholder='search...' />
            <IconButton onClick={search}>
              <FiSearch className='icon' />
            </IconButton>
            <SearchResultList
              isDropdownOpen={isDropdownOpen}
              setIsDropdownOpen={setIsDropdownOpen}
            />
          </SearchSection>
        </LogoBox>
        <MenuBox>
          <IconButton onClick={changeMode}>
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

const SearchSection = styled(FlexBetween)<{ $isDropdownOpen: boolean }>`
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
