import {Box} from "@mui/material";

import {useSelector} from "react-redux";
import LoginFormComponent from "../components/loginFormComponent";
import Router from "next/router";
import {useEffect, useState} from "react";

import LinearProgress from '@mui/material/LinearProgress';

export default function Home() {
    const {user, token} = useSelector(state => state.userInfo)
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (token) {
            Router.push('/services')
        } else
            setLoading(false)
    }, [token])

    return (
        <>
            {loading ? <LinearProgress/> :
                <Box width='100%' height='100vh' display='flex' justifyContent='center' alignItems='center'>
                    <LoginFormComponent/>
                </Box>
            }
        </>
    );
}
