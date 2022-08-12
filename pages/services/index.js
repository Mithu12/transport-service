import React, {useEffect, useState} from 'react';
import {Box, Button} from "@mui/material";
import FilterPageLeftBoxComponent from "../../components/filterPageLeftBoxComponent";
import FilterPageRightBoxComponent from "../../components/filterPageRightBoxComponent";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";
import LinearProgress from "@mui/material/LinearProgress";
import {useGetFilterDataQuery} from "../../store/services/userApi";

function Index(props) {
    const {token} = useSelector(state => state.userInfo)
    const [loading, setLoading] = useState(true);
    const {data, isLoading} = useGetFilterDataQuery()
    const Router = useRouter()

    const {manage, selected, newF} = Router.query


    useEffect(() => {
        if (!token) {
            Router.push('/')
        } else
            setLoading(false)
    }, [token])

    const filterDetails = (id) => {
        // setSelectedFilter(id)
        if (manage)
            Router.push({
                pathName: `/services`,
                query: {
                    manage: 1,
                    selected: id
                }
            })
        else
            Router.push({
                pathName: `/services`,
                query: {
                    result: 1,
                    selected: id
                }
            })
    }

    const filterManage = () => {
        // setManageFilter(true)
        Router.push({
            pathName: `/services`,
            query: {manage: 1}
        })

    }

    const backButtonHandler = () => {
        Router.push({
            pathName: `/services`,
        })
    }

    const newFilterButtonHandler = () => {

        Router.push({
            pathName: `/services`,
            query: {newF: 1}
        })
    }


    return (
        <Box>
            {isLoading || loading ? <LinearProgress/> :
                <>
                    <Box height='9.5vh' bgcolor='#FFFFFF'></Box>
                    <Box marginX='6.94%' marginTop='30px' marginBottom='40px' height='83vh' width={"80%"}>
                        <Box marginBottom='20px' height='60px'>
                            <Box display='flex' padding='10px' fontWeight='600' borderRadius='10px' fontSize='24px'
                                 bgcolor="#fff" justifyContent='space-between'>
                                <Box display='flex'>
                                    <Box>{manage || newF ? 'Filter Management' : 'Cloud Request'}</Box>

                                    <Box sx={{
                                        marginLeft: '10px',
                                        marginTop: '2px'
                                    }}>
                                        <svg width="34" height="34" viewBox="0 0 34 34" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="17" cy="17" r="17" fill="#F8F8F8"/>
                                            <g clipPath="url(#clip0_10_1814)">
                                                <path
                                                    d="M13.8524 7.80727C12.6805 8.05452 11.5697 8.53319 10.5851 9.21524C9.60059 9.89729 8.76208 10.769 8.11875 11.7793C7.47541 12.7895 7.0402 13.9181 6.83861 15.0987C6.63703 16.2793 6.67312 17.4883 6.94477 18.6548C7.21643 19.8213 7.71819 20.9219 8.42064 21.892C9.12309 22.8621 10.0121 23.6822 11.0356 24.3043C12.0591 24.9264 13.1964 25.338 14.381 25.5149C15.5656 25.6918 16.7736 25.6304 17.9341 25.3345C19.3786 24.9665 18.819 22.7871 17.3787 23.154C16.0901 23.4843 14.7327 23.4265 13.4768 22.9879C12.221 22.5493 11.1227 21.7494 10.32 20.6886C9.51723 19.6279 9.0458 18.3536 8.96489 17.0258C8.88398 15.698 9.19719 14.3759 9.86518 13.2256C10.5332 12.0752 11.5262 11.1478 12.7195 10.56C13.9128 9.9721 15.2532 9.74991 16.5723 9.92131C17.8915 10.0927 19.1306 10.6501 20.1341 11.5234C21.1375 12.3967 21.8605 13.547 22.2124 14.8299L20.9748 13.9548C19.7366 13.079 18.4885 14.9526 19.6759 15.7918L22.829 18.0214C23.0127 18.1525 23.2215 18.244 23.4424 18.2902C23.6632 18.3364 23.8913 18.3362 24.112 18.2896C24.3328 18.2431 24.5415 18.1512 24.7249 18.0197C24.9083 17.8883 25.0625 17.7202 25.1775 17.5262L27.1613 14.2127C27.9253 12.9379 25.9954 11.7798 25.231 13.0569L24.4307 14.3936C23.8594 12.1421 22.4391 10.1989 20.4672 8.97121C18.4954 7.74347 16.1249 7.32637 13.8524 7.80727V7.80727Z"
                                                    fill="#696969"/>
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_10_1814">
                                                    <rect width="24" height="24" fill="white"
                                                          transform="matrix(-0.206418 -0.978464 -0.978464 0.206418 31.3965 25.5684)"/>
                                                </clipPath>
                                            </defs>
                                        </svg>

                                    </Box>
                                </Box>

                                <Box display='flex' alignItems='center' gap={2}>
                                    {
                                        manage || newF ?
                                            <Button sx={{color: '#47A7FF', borderColor: '#47A7FF'}} size='small'
                                                    variant='outlined'
                                                    onClick={() => backButtonHandler()}>Back</Button>
                                            : <>
                                                <Button sx={{color: '#47A7FF', borderColor: '#47A7FF'}} size='small'
                                                        variant='outlined'
                                                        onClick={() => filterManage()}>Manage Filter</Button>

                                                <Button sx={{color: '#47A7FF', borderColor: '#47A7FF'}} size='small'
                                                        variant='outlined' onClick={newFilterButtonHandler}>Add
                                                    Filter</Button>
                                            </>
                                    }
                                </Box>
                            </Box>

                            <Box marginTop='20px' display='flex'>
                                <FilterPageLeftBoxComponent filters={data.filters} filterDetails={filterDetails}/>
                                <FilterPageRightBoxComponent cities={data.cities}
                                                             transportation_types={data.transportation_types}
                                                             />

                            </Box>
                        </Box>
                    </Box>
                </>}
        </Box>
    );
}

export default Index;