
import { Link } from "react-router-dom"

const SidePanel = () => {
    return (<>
        <div className="flex flex-col gap-4 h-screen bg-blue-950 p-8 text-lg rounded-lg text-gray-100 divide-y-2 divide-slate-400/25">
            <h1 className="text-gray-400 mb-4">MENU</h1>
            <Link to="/admin/users">
                <button className="h-8 w-full text-gray-100 text-start hover:text-gray-300">Manage Users</button>
            </Link>

            <Link to="/admin/blogs">
                <button className="h-8 w-full text-gray-100 text-start hover:text-gray-300">Manage Blog</button>
            </Link>
            <Link to="/admin/blogs">
                <button className="h-8 w-full text-gray-100 text-start hover:text-gray-300">Calendar</button>
            </Link>
            <Link to="/admin/blogs">
                <button className="h-8 w-full text-gray-100 text-start hover:text-gray-300">To Dos</button>
            </Link>
            <Link to="/admin/blogs">
                <button className="h-8 w-full text-gray-100 text-start hover:text-gray-300">Report</button>
            </Link>
            <h1 className="text-gray-400 my-4">OTHER</h1>
        </div>

    </>
    )
}

export default SidePanel