import { extendTheme } from "@chakra-ui/react";

export const palette = {
  ink: "#0a0a0a",
  paper: "#f4f4f4",
  quiet: "#9a9a9a",
  line: "#2a2a2a",
  field: "#141414",
  hazard: "#ff7a6b",
};

const theme = extendTheme({
  fonts: {
    heading: '"Geist", sans-serif',
    body: '"Geist", sans-serif',
    mono: '"Geist Mono", ui-monospace, monospace',
  },
  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "22px",
    "2xl": "28px",
    "3xl": "36px",
    "4xl": "48px",
    "5xl": "64px",
    "6xl": "72px",
  },
  radii: {
    sm: "6px",
    md: "8px",
    lg: "12px",
  },
  styles: {
    global: {
      "html, body, #root": {
        bg: palette.ink,
        color: palette.paper,
        minH: "100%",
      },
      body: {
        fontFamily: '"Geist", sans-serif',
        lineHeight: "1.5",
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 500,
        borderRadius: "8px",
        letterSpacing: "-0.011em",
        transitionProperty: "background-color, color, border-color",
        transitionDuration: "150ms",
      },
      variants: {
        solid: {
          bg: palette.paper,
          color: palette.ink,
          _hover: { bg: "#e4e4e4" },
          _active: { bg: "#d4d4d4" },
          _disabled: {
            bg: "#242424",
            color: "#6d6d6d",
            opacity: 1,
            cursor: "not-allowed",
          },
        },
        outline: {
          bg: "transparent",
          color: palette.paper,
          border: "1px solid",
          borderColor: palette.line,
          _hover: { bg: palette.field, borderColor: "#3a3a3a" },
          _active: { bg: "#1c1c1c" },
        },
        ghost: {
          bg: "transparent",
          color: palette.paper,
          _hover: { bg: palette.field },
        },
      },
      defaultProps: {
        variant: "solid",
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            bg: palette.field,
            border: "1px solid",
            borderColor: palette.line,
            borderRadius: "8px",
            color: palette.paper,
            _placeholder: { color: "#6f6f6f" },
            _hover: { borderColor: "#3a3a3a" },
            _focusVisible: {
              borderColor: palette.paper,
              boxShadow: "0 0 0 1px #f4f4f4",
            },
          },
        },
      },
    },
    Select: {
      variants: {
        outline: {
          field: {
            bg: palette.field,
            border: "1px solid",
            borderColor: palette.line,
            borderRadius: "8px",
            color: palette.paper,
            _hover: { borderColor: "#3a3a3a" },
          },
        },
      },
    },
    Textarea: {
      variants: {
        outline: {
          bg: palette.field,
          border: "1px solid",
          borderColor: palette.line,
          borderRadius: "8px",
          color: palette.paper,
          _focusVisible: {
            borderColor: palette.paper,
            boxShadow: "0 0 0 1px #f4f4f4",
          },
        },
      },
    },
    Checkbox: {
      baseStyle: {
        control: {
          borderColor: "#3a3a3a",
          bg: palette.field,
          borderRadius: "4px",
          _checked: {
            bg: palette.paper,
            borderColor: palette.paper,
            color: palette.ink,
          },
        },
        label: { color: palette.paper },
      },
    },
    Slider: {
      baseStyle: {
        filledTrack: { bg: palette.paper },
        track: { bg: "#2a2a2a" },
        thumb: { bg: palette.paper },
      },
    },
    Progress: {
      baseStyle: {
        track: { bg: "#242424", borderRadius: "999px" },
        filledTrack: { bg: palette.paper },
      },
    },
    Badge: {
      baseStyle: {
        borderRadius: "999px",
        fontWeight: 500,
        textTransform: "none",
        letterSpacing: "-0.01em",
      },
    },
    Tooltip: {
      baseStyle: {
        bg: palette.field,
        color: palette.paper,
        border: "1px solid",
        borderColor: palette.line,
        borderRadius: "8px",
        px: 3,
        py: 2,
        fontSize: "12px",
        "--popper-arrow-bg": palette.field,
      },
    },
  },
});

export default theme;
