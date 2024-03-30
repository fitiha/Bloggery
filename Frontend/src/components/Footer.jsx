import { Typography } from '@mui/material'

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <div className='bg-gray-100'>
            <footer>
                <hr className="bg-zinc-300 h-0.5 " />
                <Typography variant="body2" color="text.primary" align="center" className="py-2">
                    <p className="font-['Quattrocento']">© {currentYear} Bloggery. All rights reserved.</p>
                </Typography>
            </footer>
        </div>
    )
}

export default Footer