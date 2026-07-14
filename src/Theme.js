import { createTheme, virtualColor } from '@mantine/core';

export const theme = createTheme({
  fontFamily: 'Montserrat, Assistant, sans-serif',
  fontFamilyMonospace: 'Monaco, Courier, monospace',

  primaryColor: 'brandCyan',
  primaryShade: 6,

  colors: {
    brandCyan: [
      '#e0fbff',
      '#b3f5ff',
      '#80efff',
      '#4de9ff',
      '#1ae4ff',
      '#00d8ff',
      '#00b8da',
      '#0096b4',
      '#00758d',
      '#005466'
    ],
    brandPurple: [
      '#f4ecff',
      '#e3d1ff',
      '#c2a3ff',
      '#a073ff',
      '#834dff',
      '#6c26ff',
      '#8f4bff',
      '#5314cc',
      '#410d9e',
      '#2f0671'
    ]
  },

  components: {
    Card: {
      defaultProps: {
        shadow: 'sm',
        radius: 'lg',
        withBorder: true,
      },
      styles: (theme) => ({
        root: {
          backgroundColor: '#white',
          borderColor: '#e9ecef',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 20px rgba(143, 75, 255, 0.08)', 
            borderColor: '#8f4bff',
          }
        }
      })
    },

    Button: {
      defaultProps: {
        radius: 'md',
        loaderProps: { type: 'dots' },
      },
      styles: (theme, params) => ({
        root: {
          fontWeight: 600,
          transition: 'background-color 0.15s ease, transform 0.1s ease',
          '&:active': {
            transform: 'scale(0.98)',
          }
        }
      })
    },

    TextInput: {
      defaultProps: {
        radius: 'md',
      },
      styles: {
        input: {
          '&:focus': {
            borderColor: '#00d8ff', // צבע הטורקיז שלך בזמן פוקוס על השדה
          }
        }
      }
    },
    PasswordInput: {
      defaultProps: {
        radius: 'md',
      },
      styles: {
        input: {
          '&:focus-within': {
            borderColor: '#00d8ff',
          }
        }
      }
    },

    // 4. תגים (Badges)
    Badge: {
      defaultProps: {
        radius: 'sm',
        variant: 'light',
      },
      styles: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        }
      }
    }
  }
});