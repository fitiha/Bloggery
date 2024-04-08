import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { TextField } from "@mui/material";
import { useState } from "react";
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";
import axios from "axios";


const SetNewPassword = () => {
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.currentUser.value);
    const [newPass, setNewPass] = useState(null);
    const [cNewPass, setCNewPass] = useState('');

    const handleSubmit = async () => {
        console.log("New Password: ", newPass)
        console.log("Confirm New Password: ", cNewPass)
        if (newPass != cNewPass)
            toast.warn("Passwords don't match");
        else {
            try {
                const response = await axios.post(`https://bloggery-a3xc.onrender.com/api/user/change`, { userId: currentUser._id, newPassword: cNewPass });
                console.log("change password: ", response)
                if (response.status == 200) {
                    toast.success("Successfully changed the password.")
                    navigate('/profile')
                }
            } catch (err) {
                console.log("Password change: ", err);
            }
        }
    }


    return (<div className="lg:mx-16 h-svh">
        <div className="flex justify-start items-center ml-4 lg:ml-16 pt-8">
            <Link to={'/edit-profile'}>
                <ArrowBackIcon className="text-gray-600 mt-4 hover:text-blue-500" style={{ fontSize: '2rem' }} />
            </Link>
        </div>
        <div className="flex justify-center">
            <div className=" h-96 bg-gray-950 lg:w-6/12 mx-2 text-gray-100 p-8 rounded-lg flex flex-col gap-3">
                <h1 className="text-4xl">Set New Password</h1>
                <p>Please enter your new password</p>
                <TextField
                    type="password"
                    fullWidth
                    variant="outlined"
                    name="password"
                    label="New password"
                    onChange={e => setNewPass(e.target.value)}
                    required
                    InputLabelProps={{
                        shrink: true,
                        sx: { color: 'white' }
                    }}
                    InputProps={{
                        sx: { color: 'white', '&::before': { borderBottomColor: 'white' }, '&::after': { borderBottomColor: 'gray' } }
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'gray' },
                            '&:hover fieldset': { borderColor: 'orange' },
                            '&.Mui-focused fieldset': { borderColor: 'gray' },
                        },
                    }}
                />
                <TextField
                    type="password"
                    fullWidth
                    variant="outlined"
                    name="cpassword"
                    label="Confirm new password"
                    onChange={e => setCNewPass(e.target.value)}
                    required
                    InputLabelProps={{
                        shrink: true,
                        sx: { color: 'white' }
                    }}
                    InputProps={{
                        sx: { color: 'white', '&::before': { borderBottomColor: 'white' }, '&::after': { borderBottomColor: 'gray' } }
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'gray' },
                            '&:hover fieldset': { borderColor: 'orange' },
                            '&.Mui-focused fieldset': { borderColor: 'gray' },
                        },
                    }}
                />
                <div className="flex justify-center mt-8">
                    <button onClick={handleSubmit} className="bg-gray-800 w-full text-white px-6 py-3 rounded-lg font-medium text-lg hover:bg-orange-800 transition-colors">Submit</button>
                </div>
            </div>
        </div>

    </div>
    )
}

export default SetNewPassword