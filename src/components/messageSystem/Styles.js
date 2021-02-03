import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => {
    return {
        messageContainer: {
            width: "75%",
            bottom: "80px",
            margin: "auto",
            marginBottom: "2rem",
        },
        message: {
            width: "100%",
            fontWeight: "bold"
        }
    }
});

export default useStyles;