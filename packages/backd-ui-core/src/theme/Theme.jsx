import { createTheme } from '@mui/material';
import Colors from './Colors';

const globalTheme = createTheme({
  palette: {
    primary: {
      light: Colors.brandLight,
      main: Colors.brand,
    },
    secondary: {
      main: Colors.brandSecondary,
    },
    outlined: {
      main: Colors.white,
    },
    muted: {
      main: Colors.muted,
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 320,
      md: 425,
      lg: 768,
      xl: 1024,
      xxl: 1440,
    },
  },
  typography: {
    fontFamily: 'neutrif-pro, sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      @font-face {
        font-family: "neutrif-pro-bold";
        src: url("NeutrifPro-Bold.eot");
        src: local("NeutrifPro-Bold"),
          url("NeutrifPro-Bold.eot?#iefix") format("embedded-opentype"),
          url("NeutrifPro-Bold.woff2") format("woff2"),
          url("NeutrifPro-Bold.woff") format("woff"),
          url("NeutrifPro-Bold.ttf") format("truetype");
        font-weight: bold;
        font-style: normal;
      }
      
      @font-face {
        font-family: "neutrif-pro-semibold";
        src: url("NeutrifPro-SemiBold.eot");
        src: local("NeutrifPro-SemiBold"),
          url("NeutrifPro-SemiBold.eot?#iefix") format("embedded-opentype"),
          url("NeutrifPro-SemiBold.woff2") format("woff2"),
          url("NeutrifPro-SemiBold.woff") format("woff"),
          url("NeutrifPro-SemiBold.ttf") format("truetype");
        font-weight: 600;
        font-style: normal;
      }
      
      @font-face {
        font-family: "neutrif-pro-regular";
        src: url("NeutrifPro-Regular.eot");
        src: local("NeutrifPro-Regular"),
          url("NeutrifPro-Regular.eot?#iefix") format("embedded-opentype"),
          url("NeutrifPro-Regular.woff2") format("woff2"),
          url("NeutrifPro-Regular.woff") format("woff"),
          url("NeutrifPro-Regular.ttf") format("truetype");
        font-weight: normal;
        font-style: normal;
      }
      `,
    },
  },
});

const Theme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'disabled' },
          style: {
            border: `1px solid ${Colors.muted}`,
            color: Colors.brightBackground,
            pointerEvents: 'none',
          },
        },
        {
          props: { variant: 'selection' },
          style: {
            border: `1px solid ${Colors.muted}`,
            color: Colors.muted,
            '&:hover': {
              color: globalTheme.palette.primary.main,
              backgroundColor: globalTheme.palette.primary.light,
              border: `1px solid ${globalTheme.palette.primary.main}`,
            },
            '&.active': {
              color: globalTheme.palette.primary.main,
              backgroundColor: globalTheme.palette.primary.light,
              border: `1px solid ${globalTheme.palette.primary.main}`,
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          borderRadius: '4px',
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        outlined: {
          color: Colors.brand,
          backgroundColor: Colors.white,
          border: `2px solid ${Colors.brand}`,
          '&:hover': {
            color: Colors.white,
            backgroundColor: Colors.brand,
          },
        },
        muted: {
          background: Colors.muted,
          color: Colors.white,
          border: `2px solid ${Colors.muted}`,
          '&:hover': {
            color: Colors.white,
            backgroundColor: Colors.muted,
            border: `2px solid ${Colors.muted}`,
          },
          '&:disabled': {
            color: Colors.white,
          },
        },
        containedPrimary: {
          color: Colors.white,
          backgroundColor: Colors.brand,
          border: `2px solid ${Colors.brand}`,
          '&:hover': {
            color: Colors.brand,
            backgroundColor: Colors.white,
            border: `2px solid ${Colors.brand}`,
          },
        },
        containedSecondary: {
          color: Colors.white,
          backgroundColor: Colors.brandSecondary,
          border: `2px solid ${Colors.brandSecondary}`,
          '&:hover': {
            color: Colors.brandSecondary,
            backgroundColor: Colors.white,
            border: `2px solid ${Colors.brandSecondary}`,
          },
        },
        sizeLarge: {
          minWidth: '11.25rem',
          minHeight: '3.375rem',
        },
        sizeMeduim: {
          minWidth: '8.75rem',
          minHeight: '2.75rem',
        },
        sizeSmall: {
          minWidth: '6.75rem',
          minHeight: '2.25rem',
        },
      },
    },
    MuiLoadingButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          '&.MuiButton-contained': {
            '&:disabled': {
              backgroundColor: globalTheme.palette[ownerState.color].main,
            },
          },
          '&.MuiButton-outlined': {
            '&:disabled': {
              border: `2px solid ${globalTheme.palette.primary.main}`,
              backgroundColor: globalTheme.palette.outlined.main,
            },
          },
        }),
      },
    },
  },
  globalTheme,
});

export default Theme;
