import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => {
    return {
        pageBanner: {},
        tag: {
            maxWidth: "100%",
            margin: "auto",
            textAlign: "center",
            backgroundColor: theme.palette.background.dark,
            borderRadius: "10px",
            [theme.breakpoints.up('sm')]: {
                maxWidth: 325
            },
        },
        spreadBox: {
            display: "flex",
            justifyContent: "space-between",
            "& .backToScan": {
                margin: 0,
                padding: 0,
                color: theme.palette.iconButton.primary.main
            }
        }
    }
});

export default useStyles;