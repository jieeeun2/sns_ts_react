const colorTokens = {
  grey: {
    0: '#FFFFFF',
    10: '#F6F6F6',
    50: '#F0F0F0',
    100: '#E0E0E0',
    200: '#C2C2C2',
    300: '#A3A3A3',
    400: '#858585',
    500: '#666666',
    600: '#4D4D4D',
    700: '#333333',
    800: '#1A1A1A',
    900: '#0A0A0A',
    1000: '#000000',
  },
  primary: {
    50: '#E6FBFF',
    100: '#CCF7FE',
    200: '#99EEFD',
    300: '#66E6FC',
    400: '#33DDFB',
    500: '#00D5FA',
    600: '#00A0BC',
    700: '#006B7D',
    800: '#00353F',
    900: '#001519',
  },
}

export const themeSettings = (mode: 'light' | 'dark') =>
  mode === 'dark'
    ? {
        primary: {
          dark: colorTokens.primary[200], //200: '#99EEFD'
          main: colorTokens.primary[500], //500: '#00D5FA'
          light: colorTokens.primary[800], //800: '#00353F'
        },
        neutral: {
          dark: colorTokens.grey[100], //100: '#E0E0E0'
          main: colorTokens.grey[200], //200: '#C2C2C2'
          mediumMain: colorTokens.grey[300], //300: '#A3A3A3'
          medium: colorTokens.grey[400], //400: '#858585'
          light: colorTokens.grey[700], //700: '#333333'
        },
        background: {
          default: colorTokens.grey[900], //900: '#0A0A0A'
          alt: colorTokens.grey[800], //800: '#1A1A1A'
        },
      }
    : {
        primary: {
          dark: colorTokens.primary[700], //700: '#006B7D'
          main: colorTokens.primary[400], //400: '#33DDFB'
          light: colorTokens.primary[100], //100: '#CCF7FE'
        },
        neutral: {
          dark: colorTokens.grey[700], //700: '#333333'
          main: colorTokens.grey[600], //600: '#4D4D4D'
          mediumMain: colorTokens.grey[500], //500: '#666666'
          medium: colorTokens.grey[400], //400: '#858585'
          light: colorTokens.grey[100], //100: '#E0E0E0'
        },
        background: {
          default: colorTokens.grey[0], //0: '#FFFFFF'
          alt: colorTokens.grey[10], //10: '#F6F6F6'
        },
      }
