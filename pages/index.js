import {Box, Paper, Typography} from "@mui/material";

export default function Home() {
    return (
        <>
            <Box width='100%' height='100vh' display='flex' justifyContent='center' alignItems='center'>
                <Box width='759px' height='431px' component={Paper} display='flex' justifyContent='center'
                     alignItems='center'>
                    <Typography>
                        Login Page
                    </Typography>
                </Box>
            </Box>
        </>
    );
}
