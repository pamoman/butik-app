import { makeStyles } from "@material-ui/core/styles";
import banner from 'assets/img/banners/start.jpg';

const useStyles = makeStyles(theme => {
    return {
        pageBanner: {
            backgroundImage: `url(${banner})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
        },
    }
});

export default useStyles;