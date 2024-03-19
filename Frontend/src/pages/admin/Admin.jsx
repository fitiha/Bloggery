
import { Outlet } from 'react-router-dom'
import SidePanel from './SidePanel'

const Dashboard = () => {
    return (<>
        <div className='grid grid-cols-6 '>
            <div className="col-start-1 col-end-2 h-full">
                <SidePanel />
            </div>
            <div className="col-start-2 col-end-7 mx-2 rounded-lg p-8 bg-zinc-900 text-gray-200" >
                <Outlet />
            </div>
        </div>
    </>
    )
}

export default Dashboard