import { Dispatch, FC, SetStateAction } from 'react'
import styled from 'styled-components'
import { FaArrowAltCircleUp } from 'react-icons/fa'
import { useAppSelector } from 'store'
import Profile from 'components/common/Profile'
import NoContentWidget from 'components/home/NoContentWidget'
import { IconButton, Span } from 'styles/ReuseableComponent'

interface SearchResultListProps {
  isDropdownOpen: boolean
  setIsDropdownOpen: Dispatch<SetStateAction<boolean>>
}

const SearchResultList: FC<SearchResultListProps> = ({ isDropdownOpen, setIsDropdownOpen }) => {
  const { users, posts } = useAppSelector((state) => state.search.results)

  const foldComponent = () => {
    setIsDropdownOpen((prev) => !prev)
  }

  return (
    <>
      {isDropdownOpen && (
        <SearchResultListLayout $isDropdownOpen={isDropdownOpen}>
          {users.length > 0 || posts.length > 0 ? (
            <CategoryBox>
              <Span className='bold'>사용자</Span>
              <ResultByCategorySection className='users'>Profile호출</ResultByCategorySection>
            </CategoryBox>
          ) : (
            <NoContentWidget />
          )}
          <IconButton onClick={foldComponent}>
            검색결과 접기
            <FaArrowAltCircleUp className='icon' />
          </IconButton>
        </SearchResultListLayout>
      )}
    </>
  )
}

export default SearchResultList

const SearchResultListLayout = styled.div<{ $isDropdownOpen: boolean }>`
  background: ${({ theme }) => theme.neutral.light};
  opacity: 0.9;
  z-index: 10;
  position: absolute;
  top: 40px;
  width: inherit;
  padding: 16px;
  box-sizing: border-box;
  border-radius: 0 0 8px 8px;

  & > button {
    margin-right: 0;
    margin-left: auto;
    gap: 8px;
  }

  & > button:hover {
    color: ${({ theme }) => theme.primary.main};
    background: none;
  }
`

const CategoryBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  & > span {
    font-size: 16px;
  }
`

const ResultByCategorySection = styled.div`
  display: grid;
  gap: 8px;

  &.users {
    grid-template-columns: repeat(auto-fill, minmax(calc(25% - 8px), auto));
    grid-auto-rows: 60px;
  }
`
