import { useState, ChangeEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { FiSearch } from 'react-icons/fi'
import { MdDarkMode, MdLightMode, MdMessage, MdHelp } from 'react-icons/md'
import { IoIosNotifications } from 'react-icons/io'
import { RootState } from 'store'
import { setMode } from 'store/modeSlice'
import { Input, IconButton, FlexBetween } from 'styles/ReuseableComponent'
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
      <div>
        <LogoBox>
          <Link to='/' className='logo'>
            <h1>SOCIOPEDIA</h1>
          </Link>
          <SearchSection>
            <Input onChange={changeSearchText} placeholder='search...' />
            <IconButton onClick={search}>
              <FiSearch className='icon' />
            </IconButton>
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

  & > div {
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

const SearchSection = styled(FlexBetween)`
  background: ${({ theme }) => theme.neutral.light};
  border-radius: 8px;
  height: 40px;
  width: 240px;
  padding: 0 8px;
  gap: 4px;

  & > button {
    box-shadow: none;
    border-radius: 50%;
  }
`

const MenuBox = styled.div`
  display: flex;
  gap: 20px;
`
