import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => {
    return {
        loadingLayer: {
        position: "absolute",
        width: "100%",
        height: "100%",
        backgroundColor: "#000",
        opacity: "0.3",
        },
        loadingContainer: {
            position: "absolute",
            width: "1rem",
            height: "1rem",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
        },
        loading: {
            border: "5px solid #cbd5e0",
            borderTopColor: "#63b3ed",
            borderRadius: "50%",
            width: "2rem",
            height: "2rem",
            // Important: must use $ before name.
            animation: "$spin 1s linear infinite",
        },
        "@keyframes spin": {
            from: {
                transform: "rotate(0deg)",
            },
            to: {
                transform: "rotate(360deg)",
            },
        },
    }
});

export default useStyles;