import {Box, Button, IconButton, InputAdornment, OutlinedInput, Paper, TextField, Typography} from "@mui/material";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import React, {useState} from 'react';
import {useLoginMutation} from "../store/services/userApi";
import {setUserInfo} from "../store/services/authSlice";
import {useDispatch} from "react-redux";

function LoginFormComponent() {

    const dispatch = useDispatch()
    const [values, setValues] = useState({
        email: 'pathao@g.com',
        password: 'P@$$w0rd',
        showPassword: false,
    });
    const [login] = useLoginMutation()
    const handleChange = (prop) => (event) => {
        setValues({...values, [prop]: event.target.value});
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const loginHandler = async () => {
        const {data: loginData} = await login({email: values.email, password: values.password})

        dispatch(setUserInfo(loginData))

    }

    return (
        <Box width='759px' height='431px' component={Paper} display='flex' flexDirection='column'
             justifyContent='center'
             alignItems='center' padding="0 120px">
            <Typography fontSize='28px' fontWeight={600} lineHeight='42px'>
                Sing In
            </Typography>
            <Typography fontSize='18px' fontWeight={500} lineHeight='27px' marginTop='12px'>
                Please sign in to continue
            </Typography>
            <TextField
                id="outlined-start-adornment"
                sx={{mt: '40px', background: '#F8F8F8'}}
                fullWidth
                size='small'
                placeholder='Email'
                value={values.email}
                onChange={handleChange('email')}
            />

            <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                sx={{background: '#F8F8F8', mt: '16px'}}
                onChange={handleChange('password')}
                size='small'
                placeholder="Password"
                fullWidth
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {values.showPassword ? <VisibilityOff/> : <Visibility/>}
                        </IconButton>
                    </InputAdornment>
                }
            />
            <Button variant='contained'
                    sx={{
                        fontSize: '16px',
                        fontWeight: 500,
                        lineHeight: '24px',
                        marginTop: '30px',
                        width: "199px",
                        height: "48px",
                        borderRadius: "5px",
                        background: '#47A7FF',
                        textTransform: 'capitalize'
                    }}
                    size='16px'
                    onClick={loginHandler}
            >Sign
                In</Button>
        </Box>
    );
}

export default LoginFormComponent;
