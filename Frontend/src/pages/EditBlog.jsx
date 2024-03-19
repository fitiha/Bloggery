import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormDialog from "./popups/FormDialog";


const EditBlog = () => {
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

    return (
        <div>
            <FormDialog />
        </div>
    )
}

export default EditBlog