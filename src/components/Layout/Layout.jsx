
import { Box } from '@mui/material';
import Navbar from '..//Navbar/Navbar';

const Layout = ({ children }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                height: 'auto',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Navbar />
            <Box

                component="main"
                sx={{
                    bgcolor: 'background.default',
                    p: 5,
                    marginTop: '64px',
                    display: 'flex',
                    width: '100%'
                }}
            >
                {children}

            </Box>
        </Box>
    )
}

export default Layout