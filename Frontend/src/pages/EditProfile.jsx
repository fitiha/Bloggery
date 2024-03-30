import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify";
import { addUser } from "../redux/slices/currentUserSlice";
import { useNavigate } from "react-router-dom";


const EditProfile = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        avatar: null, // This will be used to store the file
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const currentUser = useSelector(state => state.currentUser.value);


    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'avatar') {
            setFormData((prevData) => ({
                ...prevData,
                avatar: files[0],
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSend = new FormData();
        dataToSend.append('name', formData.name);
        dataToSend.append('email', formData.email);
        dataToSend.append('password', formData.password);
        if (formData.avatar) {
            dataToSend.append('avatar', formData.avatar);
        }

        try {
            const response = await axios.patch(`http://localhost:5000/api/user/update/${currentUser.userId}`, dataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            },)

            toast.success("Successfully updated the user details.");
            localStorage.setItem('user', JSON.stringify(response.data.updated.name));
            localStorage.setItem('userId', JSON.stringify(response.data.updated._id));
            localStorage.setItem('email', JSON.stringify(response.data.updated.email));
            localStorage.setItem('token', JSON.stringify(currentUser.token));
            localStorage.setItem('avatar', JSON.stringify(response.data.updated.avatar));
            dispatch(addUser(response.data.updated));
            navigate("/");
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="pb-8">
            <div className="flex justify-center mt-8">
                <div className="flex-col  w-2/5 h-auto p-8 rounded-t-3xl bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500">
                    <img
                        src={`http://localhost:5000/uploads/${currentUser.avatar}`}
                        alt={currentUser.name}
                        className="h-44 w-44 float-left mr-8 rounded-full border-8 border-gray-300 hover:blur-sm"
                    />

                    <div className="flex-col pl-12 text-gray-300">
                        <h1 className="text-3xl mt-4 font-bold leading-relaxed">{currentUser.userName}</h1>
                        <h1 className="text-xl font-light mb-8">{currentUser.userEmail}</h1>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-1 mb-1 ">
                <div className="flex-col text-gray-100 w-2/5 h-auto p-8 rounded-b-3xl bg-gradient-to-r from-gray-600 via-gray-500 to-gray-500">
                    <h1 className="text-2xl font-bold ">Edit Profile</h1>
                    <hr className="border-gray-300 mt-2" />

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-gray-100 mt-4" encType="multipart/form-data">

                        <TextField
                            className="text-gray-100"
                            type="file"
                            fullWidth
                            variant="outlined"
                            name="avatar"
                            label="Avatar"
                            onChange={handleChange}
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
                                    '& fieldset': { borderColor: 'gray' }, // Change border color
                                    '&:hover fieldset': { borderColor: 'orange' }, // Change border color on hover
                                    '&.Mui-focused fieldset': { borderColor: 'gray' }, // Change border color when focused
                                },
                            }}
                        />
                        <TextField
                            type="text"
                            fullWidth
                            // variant="outlined"
                            name="name"
                            label="Name"
                            onChange={handleChange}
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
                                    '& fieldset': { borderColor: 'gray' }, // Change border color
                                    '&:hover fieldset': { borderColor: 'orange' }, // Change border color on hover
                                    '&.Mui-focused fieldset': { borderColor: 'gray' }, // Change border color when focused
                                },
                            }}
                        />

                        <TextField
                            type="email"
                            fullWidth
                            variant="outlined"
                            name="email"
                            label="Email"
                            onChange={handleChange}
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
                                    '& fieldset': { borderColor: 'gray' }, // Change border color
                                    '&:hover fieldset': { borderColor: 'orange' }, // Change border color on hover
                                    '&.Mui-focused fieldset': { borderColor: 'gray' }, // Change border color when focused
                                },
                            }}
                        />

                        <TextField
                            type="password"
                            fullWidth
                            variant="outlined"
                            name="password"
                            label="Password"
                            onChange={handleChange}
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
                                    '& fieldset': { borderColor: 'gray' }, // Change border color
                                    '&:hover fieldset': { borderColor: 'orange' }, // Change border color on hover
                                    '&.Mui-focused fieldset': { borderColor: 'gray' }, // Change border color when focused
                                },
                            }}
                        />

                        {/* <div className="flex-col mt-4">
                            <label className="text-gray-300">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                className="w-full p-2 mt-1 rounded-lg"
                                placeholder="Confirm new password"
                            />
                        </div> */}
                        <div className="flex justify-center mt-8">
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                            >
                                Update
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default EditProfile