
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../../redux/slices/currentUserSlice';

// eslint-disable-next-line react/prop-types
const ResponsiveDialog = ({ isOpen, onClose, x, onConfirm }) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleConfirmClick = () => {
        onConfirm(x); // Pass the x prop (blog ID) to the onConfirm function
        onClose(); // Close the dialog after confirmation
    };

    // if the user refreshes the page fetch the data from the local storage and add it to the store
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        const token = JSON.parse(localStorage.getItem('token'));
        const userId = JSON.parse(localStorage.getItem('userId'));
        const email = JSON.parse(localStorage.getItem('email'));

        if (user && token) {
            dispatch(addUser({ userName: user, token: token, userId: userId, userEmail: email }));
        }
    }, []);

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
