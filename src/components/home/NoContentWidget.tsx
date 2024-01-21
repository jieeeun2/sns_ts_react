import styled from 'styled-components'
import { WidgetLayout } from 'styles/ReuseableComponent'

const NoContentWidget = () => {
  return (
    <NoContentWidgetLayout>
      <p>게시물이 없습니다.</p>
    </NoContentWidgetLayout>
  )
}

export default NoContentWidget

const NoContentWidgetLayout = styled(WidgetLayout)`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    font-size: 14px;
  }
`
