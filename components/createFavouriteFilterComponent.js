import React, {useState} from 'react';
import {
    Box,
    Button,
    TextField,
    Typography
} from "@mui/material";
import SelectInputComponent from "./selectInputComponent";
import CheckboxInputComponent from "./checkboxInputComponent";
import {useAddNewFilterMutation, useGetFilterDataQuery} from "../store/services/userApi";

function CreateFavouriteFilterComponent({closeFilterCreate}) {
    const [newFilterData, setNewFilterData] = useState({
        title: '',
        requestType: '',
        transportationType: '',
        city: [],
    });
    const [addData] = useAddNewFilterMutation()
    const setInfo = (name, data) => {
        setNewFilterData(state => ({...state, [name]: data}))
    }
    const addNewFilter = async () => {
        await addData({
            name: newFilterData.title,
            transportation_type_id: newFilterData.transportationType,
            request_type: newFilterData.requestType,
            city: JSON.stringify(newFilterData.city)
        })
        closeFilterCreate()
    }

    const allRequestType = ['Simple Delivery', 'Advanced Delivery']
    const {data} = useGetFilterDataQuery()

    return (
        <>
            <Box display='flex' flexDirection='column'>
                <Typography sx={{fontWeight: 600, fontSize: '18px'}}>
                    Create Favorite Filter
                </Typography>

                <Box>
                    <Typography sx={{fontWeight: 600, fontSize: '14px', mt: '24px', color: '#454545'}}>Give a
                        title</Typography>

                    <TextField
                        id="outlined-start-adornment"
                        value={newFilterData.title}
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
                                                data={allRequestType}/>
                    </Box>

                    <Box>
                        <Typography
                            sx={{fontWeight: 600, fontSize: '14px', mt: '20px', color: '#454545', mb: '5px'}}>Transportation
                            Type</Typography>
                        <SelectInputComponent stateName='transportationType' values={data.transportation_types}
                                              label={'Select Transportation Type'} setInfo={setInfo}/>
                    </Box>


                    <Box>
                        <Typography
                            sx={{fontWeight: 600, fontSize: '14px', mt: '20px', color: '#454545', mb: '5px'}}>Select
                            City</Typography>
                        <CheckboxInputComponent label={'Select Cities'} data={data.cities}
                                                stateName={'city'}
                                                setInfo={setInfo}/>
                    </Box>


                </Box>
                <Box display={'flex'} justifyContent='space-between'>
                    <Button onClick={closeFilterCreate} variant={'contained'}
                            sx={{background: '#FF4E53', padding: '12px 61px'}}>
                        Cancel
                    </Button>
                    <Button onClick={addNewFilter} variant={'contained'}
                            sx={{background: '#47A7FF', padding: '12px 61px'}}>
                        Add Filter
                    </Button>
                </Box>

            </Box>
        </>
    );
}

export default CreateFavouriteFilterComponent;