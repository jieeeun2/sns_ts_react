import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
      'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  ::-webkit-scrollbar {
    width: 12px;
    background: ${({ theme }) => theme.neutral.light};
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.neutral.medium};
    border-radius: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.neutral.light};
    border-radius: 8px;
  }

  textarea {
    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.neutral.main};
    }

    &::-webkit-scrollbar-track {
      background: ${({ theme }) => theme.neutral.medium};
    }
  }
`

export default GlobalStyle
