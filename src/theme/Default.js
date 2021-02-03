import { createMuiTheme } from '@material-ui/core/styles';

/*
 * Create the global Theme
 */
const global = createMuiTheme({
    palette: {
        primary: {
            main: "rgb(255, 255, 255)",
        },
        secondary: {
            main: 'rgb(0, 0, 0)',
        },
        background: {
            light: 'rgb(18, 29, 38, 0.5)',
            main: 'rgb(18, 29, 38, 1)',
            dark: 'rgb(6, 13, 19, 1)',
        },
        button: {
            primary: {
                main: "rgb(255, 255, 255)",
                background: {
                    light: "rgb(46, 174, 52, 0.7)",
                    main: "rgb(46, 174, 52, 1)",
                },
            },
            secondary: {
                main: "rgb(255, 255, 255)",
                background: {
                    light: "rgb(249, 103, 45, 0.7)",
                    main: "rgb(249, 103, 45, 1)",
                },
            },
        },
        iconButton: {
            primary: {
                disabled: "rgb(220, 220, 220)",
                light: "rgb(255, 255, 255, 0.8)",
                main: "rgb(255, 255, 255, 1)",
            },
            secondary: {
                disabled: "rgb(220, 220, 220)",
                light: "rgb(0, 0, 0, 0.7)",
                main: "rgb(0, 0, 0, 1)",
            },
        },
        border: {
            primary: {
                main: "rgb(38, 45, 52)",
            },
            secondary: {
                main: "rgb(14, 125, 255)",
            },
        },
        formInput: {
            main: "rgb(0, 0, 0)",
            background: "rgba(250, 250, 250)",
            disabled: "rgb(220, 220, 220)",
        },
        tableBackground: {
            light: "rgba(60, 60, 60, 0.8)",
            main: "rgba(60, 60, 60, 0.6)",
            dark: "rgba(70, 70, 70, 0.4)",
        },
        paper: {
            light: "rgb(255, 255, 255)",
            main: "rgb(240, 240, 240)",
            dark: "rgb(220, 220, 220)"
        },
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
});

/*
 * Perform custom overrides
 */
const overrides = {
    overrides: {
        MuiCssBaseline: {
            '@global': {
                html: {
                    WebkitFontSmoothing: 'antialiased',
                    overflowX: "hidden",
                    overflowY: "auto",
                },
                body: {
                    overflowX: "hidden",
                    overflowY: "auto",
                    backgroundColor: global.palette.background.main,
                    color: global.palette.primary.main
                },
                table: {
                    "& .collapsed-table": {
                        marginBottom: "1rem",
                        "&:last-child": {
                            marginBottom: "2rem",
                        }
                    },
                    "& .collapsed-cell": {
                        paddingBottom: 0,
                        paddingTop: 0
                    },
                },
                ".clickable": {
                    cursor: "pointer"
                },
                ".center": {
                    textAlign: "center"
                },
                "::-webkit-scrollbar": {
                    width: "0px", /* Remove scrollbar space */
                    background: "transparent",  /* Make scrollbar invisible */
                },
                ".page-container": {
                    marginBottom: "9rem",
                },
                ".page": {
                    padding: global.spacing(4, 2),
                    [global.breakpoints.up('md')]: {
                        padding: global.spacing(4),
                    },
                },
                ".banner": {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    width: "100%",
                    height: "200px",
                    paddingLeft: "2rem",
                    paddingRight: "2rem",
                    textAlign: "center",
                    backgroundColor: global.palette.background.main,
                },
                ".gutter-bottom": {
                    marginBottom: global.spacing(4),
                },
                ".form": {
                    width: "100%",
                    margin: "auto",
                    "& .MuiTextField-root": {
                        width: "100%",
                        margin: global.spacing(2, 0),
                        "&.password": {
                            marginBottom: "0.25rem",
                        },
                    },
                    "& button": {
                        margin: global.spacing(2, "auto"),
                    },
                    [global.breakpoints.up('sm')]: {
                        maxWidth: "24rem",
                    },
                },
                ".table-container": {
                    "& .table": {
                        "& tr": {
                            backgroundColor: global.palette.tableBackground.main,
                            "&:nth-of-type(even)": {
                                backgroundColor: global.palette.tableBackground.light,
                            },
                        },
                        "& th": {
                            backgroundColor: global.palette.background.dark,
                            color: global.palette.primary.main,
                        },
                        "& td": {
                            color: global.palette.primary.main,
                            "&.overdue": {
                                color: global.palette.error.main,
                            },
                        },
                    },
                },
                ".table-container-paper": {
                    backgroundColor: global.palette.paper.main,
                    "& .table": {
                        "& th": {
                            color: global.palette.secondary.main,
                            fontWeight: "normal",
                            fontSize: "1.5rem",
                        },
                        "& td": {
                            color: global.palette.secondary.main,
                            fontWeight: "bold",
                            fontStyle: "italic",
                            fontSize: "1.5rem",
                        },
                    },
                },
            },
        },
        MuiTypography: {
            h1: {
                [global.breakpoints.down("sm")]: {
                    fontSize: "4rem"
                }
            }
        },
        MuiInputLabel: {
            root: {
                "&$focused:not($error)": {
                    color: global.palette.secondary.main,
                },
            },
        },
        MuiFilledInput: {
            input: {
                borderRadius: "0.4rem",
                backgroundColor: global.palette.formInput.background,
                "&$disabled": {
                    borderRadius: 0,
                    backgroundColor: global.palette.formInput.disabled,
                },
            },
            underline: {
                '&:before': {
                    borderBottom: `2px solid ${global.palette.formInput.background}`
                },
                '&:after': {
                    borderBottom: `2px solid ${global.palette.border.secondary.main}`,
                },
                "&$disabled:before": {
                    borderBottom: `2px solid ${global.palette.formInput.disabled}`
                },
                '&:hover:before': {
                    borderBottom: `2px solid ${global.palette.formInput.background}`
                },
            },
        },
        MuiButton: {
            root: {
                display: "flex",
                fontSize: "1rem",
                fontWeight: "bold",
                border: "none",
                "&.center": {
                    margin: "0 auto",
                },
            },
            sizeLarge: {
                fontSize: "1rem",
                width: "14rem",
                height: "3rem",
            },
            containedPrimary: {
                color: global.palette.button.primary.main,
                backgroundColor: global.palette.button.primary.background.light,
                "&:hover": {
                    backgroundColor: global.palette.button.primary.background.main,
                },
                "&:disabled": {
                    backgroundColor: global.palette.button.primary.background.light,
                    color: "white",
                },
            },
            containedSecondary: {
                backgroundColor: global.palette.button.secondary.background.light,
                color: global.palette.button.secondary.main,
                "&:hover": {
                    backgroundColor: global.palette.button.secondary.background.main,
                },
                "&:disabled": {
                    backgroundColor: global.palette.button.secondary.background.light,
                    color: "white",
                },
            },
            textPrimary: {
                color: global.palette.iconButton.primary.light,
                "&:hover": {
                    backgroundColor: "inherit",
                    color: global.palette.iconButton.primary.main,
                },
            },
        },
        MuiIconButton: {
            root: {
                borderRadius: "none"
            },
            colorPrimary: {
                color: global.palette.iconButton.primary.light,
                "&:hover": {
                    backgroundColor: "inherit",
                    color: global.palette.iconButton.primary.main,
                }
            },
            colorSecondary: {
                color: global.palette.iconButton.secondary.light,
                "&:hover": {
                    backgroundColor: "inherit",
                    color: global.palette.iconButton.secondary.main,
                }
            },
        },
        MuiFab: {
            root: {
                position: 'fixed',
                bottom: 100,
                left: 20,
            },
            primary: {
                color: global.palette.button.primary.main,
                backgroundColor: global.palette.button.primary.background.light,
                "&:hover": {
                    backgroundColor: global.palette.button.primary.background.main,
                }
            },
        }
    },
};

/*
 * Create the complete Theme
 */
const theme = createMuiTheme(global, overrides);

export default theme;