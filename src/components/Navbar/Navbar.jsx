import React from 'react';
import { AppBar, Toolbar, CssBaseline, Box } from '@mui/material';

const Navbar = () => {
    return (
        <>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    backgroundColor: 'white',
                    color: 'text.primary',
                    width: '100%',
                    ml: { sm: `240px` },
                    boxSizing: 'border-box',

                    boxShadow: 'none',
                    borderBottom: 1,
                    borderColor: 'divider',
                }}
            >
                <Toolbar>
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                        <Box
                            component="img"
                            src={`${process.env.PUBLIC_URL}/sykell-logo.png`}
                            alt="Sykell"
                            sx={{ width: 150, mx: 'auto' }}
                        />
                    </Box>

                </Toolbar>
            </AppBar >
        </>
    );
};

export default Navbar;
