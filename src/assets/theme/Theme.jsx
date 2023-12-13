import { createTheme } from "@mui/material";

export const theme = createTheme({
    components: {
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