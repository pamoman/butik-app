import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => {
    return {
        card: {
            maxWidth: "100%",
            margin: 'auto',
            backgroundColor: theme.palette.background.dark,
            color: theme.palette.primary.main,
            borderRadius: "1rem",
            [theme.breakpoints.up('sm')]: {
                maxWidth: 325
            },
        },
        cardHeader: {
            "& h4": {
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
            },
        },
        media: {
            height: 0,
            paddingTop: '56.25%',
            backgroundSize: "90%",
            backgroundColor: theme.palette.paper.light,
            mixBlendMode: "difference",
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        avatar: {
            display: 'flex',
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%",
            '& > *': {
                margin: theme.spacing(1)
            },
        },
        CardContent: {
            minHeight: "6rem",
            "& h5": {
                fontWeight: "bold"
            }
        },
        cardActions: {
            display: "flex",
            justifyContent: "center",
            borderTop: `1px solid ${theme.palette.border.primary.main}`,
            padding: "1rem"
        },
        barcode: {
            width: "100%"
        }
    }
});

export default useStyles;