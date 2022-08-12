import React, {useEffect, useState} from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {Box, Button, IconButton, TextField, Typography} from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import CheckboxInputComponent from "./checkboxInputComponent";
import SelectInputComponent from "./selectInputComponent";
import DialogActions from "@mui/material/DialogActions";
import {useRouter} from "next/router";
import {useGetFilterDataQuery} from "../store/services/userApi";
import DateSelectionComponent from "./dateSelectionComponent";
import {setFilterInfo} from "../store/services/authSlice";
import {useDispatch, useSelector} from "react-redux";

function SearchFilterDialog({handleClose, show}) {
    const initialState = {
        selectedFilter: '',
        requestType: '',
        transportationType: '',
        city: [],
        start_date: '',
        end_date: '',
        start_time: '',
        end_time: '',
    }
    const [filterData, setFilterData] = useState(initialState);

    const router = useRouter()
    const dispatch = useDispatch()

    const {filterInfo} = useSelector(state => state.userInfo)


    const allRequestType = ['Simple Delivery', 'Advanced Delivery']

    const {data} = useGetFilterDataQuery()

    const setInfo = (name, data, title) => {
        if (title)
            setFilterData(state => ({...state, [name]: data, transportationName: title}))
        else
            setFilterData(state => ({...state, [name]: data}))
    }
    const modalSubmitHandle = () => {
        dispatch(setFilterInfo(filterData))
        handleClose()
        router.push({
            query: {result: 1, sr: 1}
        });
    };

    useEffect(() => {
        const selected = data.filters.find(d => d.id === filterData.selectedFilter)
        if (selected)
            setFilterData(state => ({
                ...state,
                requestType: selected.request_type,
                transportationType: selected.typeoftransportations_id,
                city: selected.city,
            }))

    }, [filterData.selectedFilter]);

    useEffect(() => {
        if (filterData)
            setFilterData(initialState)
    }, [filterInfo]);


    return (
        <div>
            <Box display='flex' flexDirection='column'>
                <Dialog disableEscapeKeyDown open={show} onClose={handleClose} fullWidth sx={{padding: '50px'}}>
                    <DialogTitle display={'flex'} alignItems={'center'} justifyContent={'center'}
                                 sx={{position: 'relative'}}>Select Filter
                        <IconButton onClick={handleClose} sx={{position: 'absolute', right: 0, top: 0}}>
                            <svg width="26" height="25" viewBox="0 0 26 25" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M21.3261 4.32115C19.7543 2.74949 17.7518 1.67921 15.5717 1.24566C13.3916 0.812098 11.1319 1.03473 9.07836 1.8854C7.02481 2.73607 5.26962 4.17657 4.03474 6.02476C2.79986 7.87294 2.14075 10.0458 2.14075 12.2686C2.14075 14.4913 2.79986 16.6642 4.03474 18.5124C5.26962 20.3606 7.02481 21.8011 9.07836 22.6517C11.1319 23.5024 13.3916 23.725 15.5717 23.2915C17.7518 22.8579 19.7543 21.7876 21.3261 20.216C22.3699 19.1724 23.1978 17.9334 23.7627 16.5697C24.3276 15.2061 24.6183 13.7446 24.6183 12.2686C24.6183 10.7926 24.3276 9.33104 23.7627 7.96741C23.1978 6.60378 22.3699 5.36478 21.3261 4.32115ZM17.3926 15.1104C17.4728 15.1855 17.5367 15.2762 17.5804 15.377C17.6241 15.4778 17.6467 15.5865 17.6467 15.6964C17.6467 15.8063 17.6241 15.915 17.5804 16.0158C17.5367 16.1166 17.4728 16.2073 17.3926 16.2824C17.3175 16.3568 17.2286 16.4157 17.1308 16.4556C17.033 16.4956 16.9282 16.5158 16.8226 16.5152C16.612 16.5143 16.4102 16.4307 16.2607 16.2824L13.3787 13.4005L10.5369 16.2824C10.3874 16.4307 10.1856 16.5143 9.97497 16.5152C9.86932 16.5158 9.76459 16.4956 9.66678 16.4556C9.56897 16.4157 9.48001 16.3568 9.405 16.2824C9.25549 16.132 9.17156 15.9285 9.17156 15.7165C9.17156 15.5044 9.25549 15.3009 9.405 15.1505L12.2468 12.2686L9.405 9.42676C9.27349 9.27319 9.20477 9.07565 9.21257 8.87361C9.22037 8.67157 9.30413 8.47992 9.4471 8.33695C9.59007 8.19398 9.78172 8.11023 9.98376 8.10243C10.1858 8.09462 10.3833 8.16334 10.5369 8.29486L13.3787 11.1367L16.2205 8.29486C16.2948 8.2179 16.3836 8.15634 16.4817 8.11368C16.5798 8.07102 16.6854 8.04811 16.7923 8.04624C16.8993 8.04438 17.0056 8.0636 17.1051 8.10282C17.2047 8.14203 17.2955 8.20047 17.3725 8.27479C17.4494 8.34911 17.511 8.43786 17.5537 8.53598C17.5963 8.63409 17.6192 8.73965 17.6211 8.84662C17.623 8.95359 17.6037 9.05988 17.5645 9.15942C17.5253 9.25896 17.4669 9.34981 17.3926 9.42676L14.5106 12.2686L17.3926 15.1104Z"
                                    fill="#828282"/>
                            </svg>
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <Box>
                            <Box>
                                <SelectInputComponent stateName='selectedFilter'
                                                      values={data.filters}
                                                      label={'Select Saved Filter'} setInfo={setInfo}/>
                            </Box>
                        </Box>
                        <Box display='flex' justifyContent='center'>
                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    fontSize: '14px',
                                    m: '20px',
                                    color: '#454545',

                                }}>OR</Typography>
                        </Box>


                        <Box sx={{mb: '40px'}}>

                            {/*<List sx={{width: '100%', bgcolor: 'background.paper'}} f>*/}
                            <Box sx={{mb: '20px'}}>
                                <CheckboxInputComponent label={'Select Request Type'} stateName={'requestType'}
                                                        setInfo={setInfo}
                                                        currentValue={filterData.requestType}
                                                        data={allRequestType}/>
                            </Box>

                            <Box sx={{mb: '20px'}}>
                                <SelectInputComponent stateName='transportationType'
                                                      values={data.transportation_types}
                                                      currentValue={filterData.transportationType}
                                                      label={'Select Transportation Type'} setInfo={setInfo}/>
                            </Box>


                            <Box sx={{mb: '20px'}}>
                                <CheckboxInputComponent label={'Select Cities'} data={data.cities}
                                                        stateName={'city'}
                                                        currentValue={filterData.city}
                                                        setInfo={setInfo}/>
                            </Box>


                        </Box>
                        <Box sx={{mb: '20px', width: '100%'}} display={'flex'} justifyContent='space-between'
                             flexWrap='wrap'>

                            {/* selectionType = 0 for Date Icon and selectionType = 1 for Time Icon */}
                            <DateSelectionComponent currentValue={filterData.start_date}
                                                    setInfo={setInfo} label='Start Date' stateName='start_date'
                                                    selectionType={0}/>
                            <DateSelectionComponent currentValue={filterData.end_date}
                                                    setInfo={setInfo} label='End Date' stateName='end_date'
                                                    selectionType={0}/>
                            <DateSelectionComponent currentValue={filterData.start_time}
                                                    setInfo={setInfo} label='Start Time' stateName='start_time'
                                                    selectionType={1}/>
                            <DateSelectionComponent currentValue={filterData.end_time}
                                                    setInfo={setInfo} label='End Time' stateName='end_time'
                                                    selectionType={1}/>
                        </Box>
                    </DialogContent>
                    <DialogActions sx={{justifyContent: 'center'}}>
                        <Box display={'flex'} justifyContent='space-between'>
                            <Button onClick={modalSubmitHandle} variant={'contained'}
                                    sx={{background: '#FF4E53', padding: '12px 61px'}}>
                                Submit
                            </Button>
                        </Box>
                    </DialogActions>
                </Dialog>
            </Box>
        </div>
    );
}

export default SearchFilterDialog;