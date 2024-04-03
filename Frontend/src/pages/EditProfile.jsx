import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify";
import { addUser } from "../redux/slices/currentUserSlice";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
            // localStorage.setItem('user', JSON.stringify(response.data.updated.name));
            // localStorage.setItem('userId', JSON.stringify(response.data.updated._id));
            // localStorage.setItem('email', JSON.stringify(response.data.updated.email));
            // localStorage.setItem('token', JSON.stringify(currentUser.token));
            // localStorage.setItem('avatar', JSON.stringify(response.data.updated.avatar));
            dispatch(addUser(response.data.updated));
            navigate("/");
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="pb-8">
            <div className="flex justify-start items-center ml-4 lg:ml-16 mt-4">
                <Link to={'/profile'}>
                    <ArrowBackIcon className="text-gray-600 hover:text-blue-500" style={{ fontSize: '2rem' }} />
                </Link>
            </div>
            <div className="flex justify-center mt-4">
                <div className="flex-col mx-8 w-full lg:w-3/5 sm:w-4/5 md:w-3/5 xs:w-4/5 w-2/5 h-auto p-8 rounded-t-3xl bg-gray-950">
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
            <div className="flex justify-center mt-0.5 mb-1 ">
                <div className="flex-col w-full mx-8 lg:w-3/5 sm:w-4/5 md:w-3/5 xs:w-3/5 text-gray-100 h-auto p-8 rounded-b-3xl bg-gray-950">
                    <h1 className="text-2xl font-bold ">Edit Profile</h1>
                    <hr className="border-gray-300 mt-2" />

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-gray-100 mt-4" encType="multipart/form-data">
                        <label className="block">
                            <span className="sr-only">Choose profile photo</span>
                            <input type="file" name="avatar" onChange={handleChange} required className="w-full text-sm text-slate-100 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-800 file:text-violet-200 hover:file:bg-orange-800" />
                        </label>
                        <TextField
                            type="text"
                            fullWidth
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
                        <div className="flex justify-center mt-8">
                            <button type="submit" className="bg-gray-800 w-full text-white px-6 py-3 rounded-lg font-medium text-lg hover:bg-orange-800 transition-colors">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default EditProfile