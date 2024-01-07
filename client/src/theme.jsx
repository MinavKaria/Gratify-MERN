import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976D2',
    },
    bodyBackgroundImage: 'url("https://wallpapercave.com/wp/wp3284848.gif")',
    backgroundColoring: '#00a1a1',
    backgroundSizing: 'cover',
    backgroundRepeating: 'no-repeat',
    backgroundPositioning: 'center',
  },
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          backgroundImage: 'url("https://wallpapercave.com/wp/wp3284848.gif")',
          backgroundColor: '#00a1a1',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        },
      },
    },
  },
});

export default theme;
