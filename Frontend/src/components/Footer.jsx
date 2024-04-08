import { Typography } from '@mui/material'
import { useLocation } from 'react-router-dom';


const Footer = () => {
    const currentYear = new Date().getFullYear();
    const location = useLocation();

    return (<>
        {
            location.pathname == '/' ? null : (
                <div className='bg-white mt-12'>
                    <footer>
                        <hr className="bg-zinc-300 h-0.5 " />
                        <Typography variant="body2" color="text.primary" align="center" className="py-2">
                            <p className="font-['Quattrocento']">© {currentYear} Bloggery. All rights reserved.</p>
                        </Typography>
                    </footer>
                </div>
            )
        }
    </>
    )
}

export default Footer