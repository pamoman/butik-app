import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => {
    return {
        header: {
            backgroundColor: theme.palette.background.dark,
        },
        headerNav: {
            display: "flex",
            height: "80px",
            borderBottom: `1px solid ${theme.palette.border.primary.main}`,
            "& nav": {
                display: "none",
                "& a": {
                    width: "110px",
                    "&.selected-nav": {
                        borderBottom: `2px solid ${theme.palette.border.secondary.main}`,
                    },
                },
                [theme.breakpoints.up('md')]: {
                    display: "flex",
                }
            }
        },
        siteHeading: {
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textDecoration: "none",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            [theme.breakpoints.up('sm')]: {
                width: "350px",
                justifyContent: "flex-start",
            },
        },
        siteLogo: {
            height: "50px",
            marginRight: "1rem",
            borderRadius: "1rem",
        },
    }
});

export default useStyles;