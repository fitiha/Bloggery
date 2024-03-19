
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// eslint-disable-next-line react/prop-types
const ResponsiveDialog = ({ isOpen, onClose, x, onConfirm }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleConfirmClick = () => {
        onConfirm(x); // Pass the x prop (blog ID) to the onConfirm function
        onClose(); // Close the dialog after confirmation
    };

    return (
        <Dialog
            fullScreen={fullScreen}
            open={isOpen}
            onClose={onClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
                {"Do you really want to delete this blog?"}
            </DialogTitle>
            {/* <DialogContent>
                <DialogContentText>
                    Do you really want to delete this blog?
                </DialogContentText>
            </DialogContent> */}
            <DialogActions>
                <Button autoFocus onClick={onClose}>
                    No
                </Button>
                <Button onClick={handleConfirmClick} autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ResponsiveDialog;
