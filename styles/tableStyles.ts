import { createTheme } from '@mui/material/styles';

export const headTheme = createTheme({
  palette: {
    text: {
      primary: '#fff'
    }
  },
  typography: {
    fontFamily: 'noto-sans-kr-v12-latin-700, silka-regular-webfont',
  }
});

export const bodyTheme = createTheme({
  typography: {
    fontFamily: 'silka-regular-webfont, noto-sans-kr-v12-latin-700',
  }
});


export const tableContainerSx = {
  margin: '0px'
}

export const smallTableContainerSx = {
  margin: '1.5rem 0 0 0'
}

export const tableSx = {
  minWidth: 280,
  tableLayout: 'fixed'
}

export const tableHeaderSx = {
  bgcolor: '#2F7DD2',
}

export const textAlignSx = {
  textAlign: 'center',
}

export const tdSx = {
  maxWidth: '4rem',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
}

export const numberInputSx = {
  maxWidth: '4rem',
  fontSize: '12px',
}

export const numberSx = {
  fontSize: '12px',
}

export const qtyInputSx = {
  fontSize: '14px',
  maxWidth: '3rem',
}
