import { TextField } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify"


const ChangePassword = () => {
    const [ppas, setPpas] = useState('');
    const currentUser = useSelector((state) => state.currentUser.value);
    const navigate = useNavigate();

    const handleCheck = async () => {
        try {
            const response = await axios.post('https://bloggery-a3xc.onrender.com/api/user/checkpassword', { email: currentUser.userEmail, password: ppas })
            console.log("password status: ", response)
            if (response.status == 200)
                navigate('/set-new-password')
            else {
                toast.error("Incorrect Password. Try again later.")
                navigate('/profile')
            }
        } catch (err) {
            console.log(err)
            toast.error("Incorrect Password.")
        }
    }

    return (<div className="lg:mx-16 h-svh">
        <div className="flex justify-start items-center ml-4 lg:ml-16 pt-8">
            <Link to={'/edit-profile'}>
                <ArrowBackIcon className="text-gray-600 mt-4 hover:text-blue-500" style={{ fontSize: '2rem' }} />
            </Link>
        </div>
        <div className="flex justify-center">
            <div className=" h-96 bg-gray-950 w-6/12 text-gray-100 p-8 rounded-lg flex flex-col gap-3">
                <h1 className="text-4xl">Change Password</h1>
                <p>Please enter your previous password</p>
                <TextField
                    type="Password"
                    fullWidth
                    variant="outlined"
                    name="password"
                    label="password"
                    onChange={e => setPpas(e.target.value)}
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
                    <button onClick={handleCheck} className="bg-gray-800 w-full text-white px-6 py-3 rounded-lg font-medium text-lg hover:bg-orange-800 transition-colors">Submit</button>
                </div>
            </div>
        </div>

    </div>
    )
}

export default ChangePassword