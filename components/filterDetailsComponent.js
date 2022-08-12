import React, {useEffect, useState} from 'react';
import {
    Box,
    Button, CircularProgress,
    TextField,
    Typography
} from "@mui/material";
import SelectInputComponent from "./selectInputComponent";
import CheckboxInputComponent from "./checkboxInputComponent";
import {
    useGetFilterDataQuery,
    useUpdateFilterMutation,
    useDeleteFilterMutation
} from "../store/services/userApi";
import DeleteDialog from "./deleteDialog";
import {useRouter} from "next/router";

function FilterDetailsComponent({filter}) {
    const [filterData, setFilterData] = useState({});

    const router = useRouter()

    const {data} = useGetFilterDataQuery()
    const [updateData, {isLoading}] = useUpdateFilterMutation()
    const [deleteData, {isLoading:deleteLoading}] = useDeleteFilterMutation()

    const [open, setOpen] = useState(false);


    const setInfo = (name, data) => {
        setFilterData(state => ({...state, [name]: data}))
    }
    const updateFilter = async () => {
        updateData({
            id: filter,
            name: filterData.title,
            transportation_type_id: filterData.transportationType,
            request_type: filterData.requestType,
            city: JSON.stringify(filterData.city)
        })
    }
    const deleteFilter = async () => {
        await deleteData({id: filter})
        setOpen(false)
        router.push({
            pathName: 'services',
            query: {manage: 1}
        })
    }

    const allRequestType = ['Simple Delivery', 'Advanced Delivery']


    useEffect(() => {
        const selectedFilter = data.filters?.find(f => f.id === Number(filter))
        if (selectedFilter)
            setFilterData({
                title: selectedFilter.name,
                requestType: selectedFilter.request_type,
                transportationType: selectedFilter.typeoftransportations_id,
                city: selectedFilter.city,
            })
    }, [filter]);
    return (
        <Box display='flex' flexDirection='column'>
            <Typography sx={{fontWeight: 600, fontSize: '18px'}}>
                Favorite Filter
            </Typography>
            {isLoading || deleteLoading ? <CircularProgress/> :
                <>
                    <Box>
                        <Typography sx={{fontWeight: 600, fontSize: '14px', mt: '24px', color: '#454545'}}>Give a
                            title</Typography>

                        <TextField
                            id="outlined-start-adornment"
                            value={filterData.title}
                            onChange={e => setInfo('title', e.target.value)}
                            sx={{
                                mt: '5px',
                                padding: '5px',
                                background: '#F8F8F8',
                                borderStyle: 'none',
                                borderRadius: '5px'
                            }}
                            fullWidth
                            variant='standard'
                            size='small'
                            placeholder='Write Title'
                            InputProps={{
                                disableUnderline: true,
                            }}
                        />

                    </Box>
                    <Box sx={{mb: '40px'}}>

                        <Box>
                            <Typography
                                sx={{fontWeight: 600, fontSize: '14px', mt: '20px', color: '#454545', mb: '5px'}}>Request
                                Type</Typography>
                            <CheckboxInputComponent label={'Select Request Type'} stateName={'requestType'}
                                                    setInfo={setInfo}
                                                    data={allRequestType} currentValue={filterData.requestType}/>
                        </Box>

                        <Box>
                            <Typography
                                sx={{fontWeight: 600, fontSize: '14px', mt: '20px', color: '#454545', mb: '5px'}}>Transportation
                                Type</Typography>
                            <SelectInputComponent stateName='transportationType' values={data.transportation_types}
                                                  label={'Select Transportation Type'} setInfo={setInfo}
                                                  currentValue={filterData.transportationType}/>
                        </Box>


                        <Box>
                            <Typography
                                sx={{fontWeight: 600, fontSize: '14px', mt: '20px', color: '#454545', mb: '5px'}}>Select
                                City</Typography>
                            <CheckboxInputComponent label={'Select Cities'} data={data.cities} stateName={'city'}
                                                    currentValue={filterData.city}
                                                    setInfo={setInfo}/>
                        </Box>


                    </Box>
                    <Box display={'flex'} justifyContent='space-between'>
                        <Button variant={'contained'} onClick={() => setOpen(true)}
                                sx={{background: '#FF4E53', padding: '12px 61px'}}>
                            Delete
                        </Button>
                        <Button onClick={updateFilter} variant={'contained'}
                                sx={{background: '#47A7FF', padding: '12px 61px'}}>
                            Save Changes
                        </Button>

                    </Box>
                    {open && <DeleteDialog open={open} setOpen={setOpen} deleteFilter={deleteFilter}/>}
                </>
            }
        </Box>
    );
}

export default FilterDetailsComponent;