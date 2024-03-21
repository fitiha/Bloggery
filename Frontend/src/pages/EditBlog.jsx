
import { useEffect } from "react";
import FormDialog from "./popups/FormDialog";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/slices/currentUserSlice";


const EditBlog = () => {
    const dispatch = useDispatch();

    // const blogId = useParams();
    // const [blog, setBlog] = useState();

    // useEffect(() => {
    //     axios.get(`http://localhost:5000/api/blog/${blogId.id}`)
    //         .then((response) => {
    //             console.log(response.data);
    //             setBlog(response.data.blog);
    //         })
    //         .catch((err) => console.log(err.message));
    // }, [])


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
        <div>
            <FormDialog />
        </div>
    )
}

export default EditBlog