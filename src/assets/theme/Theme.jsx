import { createTheme } from "@mui/material";

export const theme = createTheme({
    breakpoints: {
        values: {
          xs: 0,
          sm: 601,
          md: 901,
          lg: 1201,
          xl: 1537,
        },
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    position: "sticky",
                    top: 0,
                    backgroundColor: "rgba(25, 118, 210, 0.3)",
                    backdropFilter: "blur(10px)",
                }
            }
        },
        MuiGrid: {
            styleOverrides: {
                container: {
                    maxWidth: "1200px",
                    width: "100%",
                    margin: "0 auto",
                    padding: "1rem 0",

                    "@media only screen and (max-width:1200px)": {
                        width: "95%",
                    }
                }
            }
        },
        MuiBackdrop: {
            styleOverrides: {
                root: {
                    backgroundColor:"rgba(0,0,0,0.3) !important"
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    marginRight: "1rem",
                    "&:last-child": {
                        marginRight: 0,
                    },
                    "&.active": {
                        backgroundColor: "#000",
                    }
                },
            },
        },
    }
})