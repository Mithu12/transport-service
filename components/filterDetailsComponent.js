import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    TextField,
    Typography
} from "@mui/material";
import SelectInputComponent from "./selectInputComponent";
import CheckboxInputComponent from "./checkboxInputComponent";
import {
    useAddNewFilterMutation,
    useGetFilterDataQuery,
    useUpdateFilterMutation,
    useDeleteFilterMutation
} from "../store/services/userApi";
import DeleteDialog from "./deleteDialog";

function FilterDetailsComponent({filter}) {
    const [filterData, setFilterData] = useState({
        title: filter.name,
        requestType: filter.request_type,
        transportationType: filter.transportation_type_id,
        city: filter.city,
    });


    const {data} = useGetFilterDataQuery()
    const [updateData] = useUpdateFilterMutation()
    const [deleteData] = useDeleteFilterMutation()

    const [open, setOpen] = useState(false);


    const setInfo = (name, data) => {
        setFilterData(state => ({...state, [name]: data}))
    }
    const updateFilter = async () => {
        console.log({
            id: filter,
            name: filterData.title,
            transportation_type_id: filterData.transportationType,
            request_type: filterData.requestType,
            city: JSON.stringify(filterData.city)
        })
        updateData({
            id: filter,
            name: filterData.title,
            transportation_type_id: filterData.transportationType,
            request_type: filterData.requestType,
            city: JSON.stringify(filterData.city)
        })
        // closeFilterCreate()
    }
    const deleteFilter = async () => {
        // console.log(filter)
        await deleteData({id: filter})
        setOpen(false)
    }

    const allRequestType = ['Simple Delivery', 'Advanced Delivery']


    useEffect(() => {
        const selectedFilter = data.filters.find(f => f.id === filter)
        setFilterData({
            title: selectedFilter.name,
            requestType: selectedFilter.request_type,
            transportationType: selectedFilter.typeoftransportations_id,
            city: selectedFilter.city,
        })
    }, [filter]);

    console.log(filterData)
    // console.log(JSON.stringify(filterData.city))
    return (
        <Box display='flex' flexDirection='column'>
            <Typography sx={{fontWeight: 600, fontSize: '18px'}}>
                Create Favorite Filter
            </Typography>

            <Box>
                <Typography sx={{fontWeight: 600, fontSize: '14px', mt: '24px', color: '#454545'}}>Give a
                    title</Typography>

                <TextField
                    id="outlined-start-adornment"
                    value={filterData.title}
                    onChange={e => setInfo('title', e.target.value)}
                    sx={{mt: '5px', padding: '5px', background: '#F8F8F8', borderStyle: 'none', borderRadius: '5px'}}
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

                {/*<List sx={{width: '100%', bgcolor: 'background.paper'}} f>*/}
                <Box>
                    <Typography sx={{fontWeight: 600, fontSize: '14px', mt: '20px', color: '#454545', mb: '5px'}}>Request
                        Type</Typography>
                    <CheckboxInputComponent label={'Select Request Type'} stateName={'requestType'} setInfo={setInfo}
                                            data={allRequestType} currentValue={filterData.requestType}/>
                </Box>

                {/*</List>*/}
                <Box>
                    <Typography sx={{fontWeight: 600, fontSize: '14px', mt: '20px', color: '#454545', mb: '5px'}}>Transportation
                        Type</Typography>
                    <SelectInputComponent stateName='transportationType' values={data.transportation_types}
                                          label={'Select Transportation Type'} setInfo={setInfo}
                                          currentValue={filterData.transportationType}/>
                </Box>


                <Box>
                    <Typography sx={{fontWeight: 600, fontSize: '14px', mt: '20px', color: '#454545', mb: '5px'}}>Select
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

        </Box>
    );
}

export default FilterDetailsComponent;