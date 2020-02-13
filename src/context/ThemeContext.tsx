import React, { ReactNode } from 'react';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { ThemeProvider } from '@material-ui/styles';


const theme = createMuiTheme({
    typography: {
        fontFamily: ['allumi-std', 'Helvetica Neue', 'sans-serif'].join(','),
    },
    palette: {
        contrastThreshold: 2.5,
        primary: {
            main: '#18B86b',
            dark: '#008051',
            light: '#5BCB95',
            lighter: '#EDFFF7',
            disabled: '#D8EBE2',
        },
        secondary: {
            main: '#2366a0',
            dark: '#205C90',
            light: '#219ACE',
            lighter: '#DFF0FF',
        },
    },
    status: {
        error: '#D9534F',
        success: '#18B86b',
        warning: '#F0AD4E',
        info: '#219ACE',
    },
    text: {
        primary: '#18B86b',
        primaryDark: '#008051',
        primaryDarker: '#0E6E40',
        secondary: '#2366a0',
        body: '#000000',
        error: '#D9534F',
        success: '#18B86b',
        warning: '#F0AD4E',
        info: '#219ACE',
        gray: '#8D949E',
        highlight: '#219ACE',
        white: '#fff',
    },
    overrides: {
        MuiInput: {
            underline: {
                '&:after': {
                    borderBottom: '2px solid #2366a0',
                },
            },
        },
        MuiCheckbox: {
            root: {
                padding: '5px',
            },
            colorSecondary: {
                '&$checked': {
                    color: '#219ACE',
                },
            },
        },
        MuiSnackbar: {
            root: {
                position: 'relative',
            },
            anchorOriginBottomCenter: {
                '@media (min-width: 600px)': {
                    transform: 'translate(200px, -10px)',
                    left: 'initial',
                    bottom: 'initial',
                    right: 'initial',
                },
            },
        },
        MuiSnackbarContent: {
            message: {
                display: 'flex',
                alignItems: 'center',
            },
        },
        MuiDialogContent: {
            root: {
                padding: '25px',
            },
        },
        MuiDialogTitle: {
            root: {
                borderBottom: '1px solid #eeeeee',
                margin: 0,
                padding: '5px 10px 5px 25px',
                background: '#2366a0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: 'white',
            },
        },
        MuiButton: {
            contained: {
                boxShadow: 'none',
                borderRadius: '2px',
                '&$disabled': {
                    color: '#eeeeee',
                    backgroundColor: 'none',
                    opacity: 0.4,
                },
            },
        },
        MuiTooltip: {
            tooltip: {
                color: 'white',
                backgroundColor: 'black',
                fontSize: '.8rem',
            },
            arrow: {
                color: 'black',
            },
        },
        MuiSlider: {
            root: {
                height: 6,
            },
            thumb: {
                height: 15,
                width: 15,
                backgroundColor: '#fff',
                border: '2px solid currentColor',
                '&:focus,&:hover,&$active': {
                    boxShadow: 'inherit',
                },
            },
            track: {
                height: 6,
                borderRadius: 3,
            },
            rail: {
                height: 6,
                borderRadius: 3,
            },

        },
    },
});

type Props = {
    children: ReactNode;
}
const Provider = (props: Props): JSX.Element =>
    <ThemeProvider theme={theme} {...props} />;

export default Provider;
