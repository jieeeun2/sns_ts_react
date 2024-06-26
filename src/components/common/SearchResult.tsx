import { Dispatch, FC, SetStateAction } from 'react'
import styled from 'styled-components'
import { FaArrowAltCircleUp } from 'react-icons/fa'
import Profile from 'components/common/Profile'
import NoContentWidget from 'components/home/NoContentWidget'
import { IconButton, Span } from 'styles/ReuseableComponent'
import { SearchResultType } from 'types/searchType'

interface SearchResultProps {
  isDropdownOpen: boolean
  setIsDropdownOpen: Dispatch<SetStateAction<boolean>>
  searchResult: SearchResultType
}

const SearchResult: FC<SearchResultProps> = ({
  isDropdownOpen,
  setIsDropdownOpen,
  searchResult,
}) => {
  const { users, posts } = searchResult

  const foldComponent = () => {
    setIsDropdownOpen((prev) => !prev)
  }

  return (
    <>
      {isDropdownOpen && (
        <SearchResultLayout $isDropdownOpen={isDropdownOpen}>
          {users.length > 0 || posts.length > 0 ? (
            <CategoryBox>
              <Span className='bold'>사용자</Span>
              <ResultByCategorySection className='users'>
                {users.map(({ id, profileImagePath, name, location }, index) => (
                  <Profile
                    key={index}
                    id={id}
                    profileImagePath={profileImagePath}
                    name={name}
                    location={location}
                  />
                ))}
              </ResultByCategorySection>
            </CategoryBox>
          ) : (
            <NoContentWidget />
          )}
          <IconButton onClick={foldComponent}>
            검색결과 접기
            <FaArrowAltCircleUp className='icon' />
          </IconButton>
        </SearchResultLayout>
      )}
    </>
  )
}

export default SearchResult

const SearchResultLayout = styled.div<{ $isDropdownOpen: boolean }>`
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
  gap: 8px;

  &.users {
    display: flex;
    flex-wrap: wrap;
  }
`
