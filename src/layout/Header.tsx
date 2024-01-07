import { useState, ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { FiSearch } from 'react-icons/fi'
import { MdDarkMode, MdLightMode, MdMessage, MdHelp } from 'react-icons/md'
import { IoIosNotifications } from 'react-icons/io'
import { RootState } from 'store'
import { setMode } from 'store/modeSlice'
import { Input, Button, FlexBetween } from 'styles/reuseableStyles'
import { Link } from 'react-router-dom'

const Header = () => {
  const [searchText, setSearchText] = useState<string>('')

  const mode = useSelector((state: RootState) => state.mode.mode)
  const dispatch = useDispatch()

  const changeSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  const search = () => {}

  const changeMode = () => {
    dispatch(setMode())
  }

  const checkNotification = () => {}

  const checkMessage = () => {}

  const checkHelp = () => {}

  return (
    <HeaderLayout>
      <LogoBox>
        <Link to='/' className='logo'>
          <h1>sociopedia</h1>
        </Link>
        <SearchSection>
          <Input onChange={changeSearchText} placeholder='search...' />
          <Button onClick={search}>
            <FiSearch className='icon' />
          </Button>
        </SearchSection>
      </LogoBox>
      <MenuBox>
        <Button onClick={changeMode}>
          {mode === 'dark' ? <MdDarkMode className='icon' /> : <MdLightMode className='icon' />}
        </Button>
        <Button onClick={checkNotification}>
          <IoIosNotifications className='icon' />
        </Button>
        <Button onClick={checkMessage}>
          <MdMessage className='icon' />
        </Button>
        <Button onClick={checkHelp}>
          <MdHelp className='icon' />
        </Button>
      </MenuBox>
    </HeaderLayout>
  )
}

export default Header

const HeaderLayout = styled(FlexBetween)`
  background: ${({ theme }) => theme.background.alt};
  height: 60px;
  padding: 1rem 6%;

  .icon {
    color: ${({ theme }) => theme.neutral.dark};
    font-size: 24px;
  }
`

const LogoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;

  .logo {
    text-decoration: none;

    h1 {
      color: ${({ theme }) => theme.primary.main};
      font-size: 32px;
    }
  }
`

const SearchSection = styled(FlexBetween)`
  background: ${({ theme }) => theme.neutral.light};
  border-radius: 8px;
  height: 40px;
  width: 240px;
  padding: 0 8px;
  gap: 4px;
`

const MenuBox = styled.div`
  display: flex;
  gap: 20px;
`
