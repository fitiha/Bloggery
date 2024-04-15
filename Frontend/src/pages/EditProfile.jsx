import { TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify";
import { addUser } from "../redux/slices/currentUserSlice";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import KeyIcon from '@mui/icons-material/Key';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';

const EditProfile = () => {
    // const [profileData, setProfileData] = useState('');
    const [isProfileEditVisible, setIsProfileEditVisible] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.currentUser.value);

    // useEffect(() => {
    //     setProfileData(currentUser);
    // }, [])

    const [formData, setFormData] = useState({
        name: currentUser.userName || '',
        email: currentUser.userEmail || '',
        avatar: '',
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: files ? files[0] : value,
        }));
    };

    const toggleVisibility = () => {
        setIsProfileEditVisible(!isProfileEditVisible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSend = new FormData();
        dataToSend.append('name', formData.name);
        dataToSend.append('email', formData.email);

        if (formData.avatar) {
            dataToSend.append('avatar', formData.avatar);
        } else if (currentUser.avatar) {
            console.log("No new avatar selected; using existing one from store.");
        }

        try {
            const response = await axios.patch(`https://bloggery-a3xc.onrender.com/api/user/update/${currentUser.userId}`, dataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success("Successfully updated the user details.");
            dispatch(addUser(response.data.updated));
            navigate("/profile");
        } catch (err) {
            toast.error("Failed to update profile.");
            console.error(err);
        }
    };
    console.log("data to send ", formData)

    return (
        <div className="lg:px-24 px-4 pb-8">
            <div className="flex justify-start items-center ml-4 lg:ml-16 mt-4">
                <Link to={'/profile'}>
                    <ArrowBackIcon className="text-gray-600 hover:text-blue-500" style={{ fontSize: '2rem' }} />
                </Link>
            </div>
            <div className="flex justify-center mt-4">
                <div className="flex flex-col lg:flex-row lg:mx-8 w-full lg:w-3/5 sm:w-4/5 md:w-3/5 h-auto p-8 rounded-t-3xl bg-gray-950">
                    <img
                        src={`https://bloggery-a3xc.onrender.com/uploads/${currentUser.avatar}`}
                        alt={currentUser.name}
                        className="h-44 w-44 float-left mr-8 rounded-full border-8 border-gray-300 hover:blur-sm"
                    />

                    <div className="flex-col pt-2 text-gray-300">
                        <h1 className="text-3xl mt-4 font-bold leading-relaxed">{currentUser.userName}</h1>
                        <h1 className="text-xl font-light lg:mb-8">{currentUser.userEmail}</h1>
                    </div>
                    <div className="lg:ml-32 lg:mt-8 md:mt-6 mt-3 text-gray-300 flex flex-col gap-4">
                        <Link to='/change-password'>
                            <KeyIcon className="mx-2 mb-1" />
                            <button className="hover:text-gray-100 pt-2 " >Change Password</button>
                        </Link>
                        <div>
                            <PersonRoundedIcon className="mx-2 mb-1.5" />
                            <button className="hover:text-gray-100 pt-2 " onClick={toggleVisibility}>Change Profile Picture</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center mt-0.5 mb-1">
                <div className="flex-col w-full sm:w-4/5 md:w-3/5 xs:w-3/5 text-gray-100 h-auto p-8 rounded-b-3xl bg-gray-950">
                    <h1 className="text-2xl font-bold">Edit Profile</h1>
                    <hr className="border-gray-300 mt-2" />

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-gray-100 mt-4" encType="multipart/form-data">
                        <label className={`${isProfileEditVisible ? '' : 'hidden'}`}>
                            <span className="sr-only">Choose profile photo</span>
                            <input type="file" name="avatar" onChange={handleChange} className="w-full text-sm text-slate-100 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-800 file:text-violet-200 hover:file:bg-orange-800" />
                        </label>
                        <TextField
                            type="text"
                            fullWidth
                            name="name"
                            label="Name"
                            value={formData.name}
                            onChange={handleChange}
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
                            value={formData.email}
                            label="Email"
                            onChange={handleChange}
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