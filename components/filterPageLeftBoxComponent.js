import React, {useEffect, useState} from 'react';
import {Box, Button, CircularProgress, TextField, Typography} from "@mui/material";
import {useGetFilterDataQuery} from "../store/services/userApi";
import {useRouter} from "next/router";
import SearchFilterDialog from "./searchFilterDialog";

const FilterPageLeftBoxComponent = ({filterDetails}) => {
    const {data: {filters}, isLoading, isFetching} = useGetFilterDataQuery()
    const [search, setSearch] = useState('');
    const [filterDialog, setFilterDialog] = useState(false);
    const [allFilters, setAllFilters] = useState([]);
    const selectFilter = (id) => {
        filterDetails(id)
    }
    const router = useRouter()

    const searchHandler = (val) => {
        setSearch(val)
    }
    useEffect(() => {
        if (filters)
            setAllFilters(filters)
    }, [filters]);

    useEffect(() => {
        const filteredData = filters?.filter(v => (v.name.includes(search)))
        setAllFilters(filteredData)
    }, [search]);


    const filterButtonHandler = () => {
        setFilterDialog(true)
    }
    const handleClose = () => {
        setFilterDialog(false)
    }


    return (
        <Box width='30%' bgcolor="#fff" height='75vh' marginRight='30px' borderRadius='10px'>
            <SearchFilterDialog show={filterDialog} handleClose={handleClose}/>
            <Box sx={{m: '20px',}}>
                <Box sx={{display: 'flex', mb: '24px'}} justifyContent={'space-between'}>
                    <TextField
                        id="outlined-start-adornment"
                        sx={{background: '#F8F8F8', width: "80%"}}
                        size='small'
                        placeholder='Search'
                        onChange={e => searchHandler(e.target.value)}
                    />
                    <Button sx={{width: '8%'}} onClick={filterButtonHandler}>
                        <svg width="100%" height="30"
                             viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                  d="M11.0972 7.9732C11.0972 10.3065 9.17357 12.1978 6.79859 12.1978C4.42499 12.1978 2.5 10.3065 2.5 7.9732C2.5 5.64123 4.42499 3.75 6.79859 3.75C9.17357 3.75 11.0972 5.64123 11.0972 7.9732ZM25.6167 6.12291C26.6556 6.12291 27.5 6.95254 27.5 7.9732C27.5 8.99523 26.6556 9.82486 25.6167 9.82486H17.3973C16.357 9.82486 15.5126 8.99523 15.5126 7.9732C15.5126 6.95254 16.357 6.12291 17.3973 6.12291H25.6167ZM4.38471 19.9474H12.6041C13.6444 19.9474 14.4888 20.7771 14.4888 21.7991C14.4888 22.8198 13.6444 23.6508 12.6041 23.6508H4.38471C3.34444 23.6508 2.5 22.8198 2.5 21.7991C2.5 20.7771 3.34444 19.9474 4.38471 19.9474ZM23.2014 25.9722C25.5764 25.9722 27.5 24.081 27.5 21.749C27.5 19.4157 25.5764 17.5245 23.2014 17.5245C20.8278 17.5245 18.9028 19.4157 18.9028 21.749C18.9028 24.081 20.8278 25.9722 23.2014 25.9722Z"
                                  fill="#696969"/>
                        </svg>

                    </Button>


                </Box>
                {
                    isLoading || isFetching ? <CircularProgress/> :

                        allFilters?.map(f => {
                            return <>
                                {/*<Stack spacing={3} direction='column'>*/}
                                <Box key={f.id}
                                     sx={{
                                         background: '#F4FAFF',
                                         padding: '13px 14px',
                                         mb: '16px',
                                         cursor: 'pointer',
                                         borderLeft: Number(router.query.selected) === f.id ? '3px solid #47A7FF' : '',
                                         borderRadius: '5px'
                                     }}
                                     onClick={() => selectFilter(f.id)}>

                                    <Typography sx={{fontWeight: 600, fontSize: '14px'}}>
                                        {f.name}
                                    </Typography>
                                    <Typography sx={{fontWeight: 400, fontSize: '12px'}}>
                                        {f.transportation_type}
                                    </Typography>
                                    <Typography sx={{fontWeight: 400, fontSize: '10px', color: '#9E9E9E'}}>
                                        {f.city?.join(',')}
                                    </Typography>
                                </Box>
                            </>
                        })
                }

            </Box>


        </Box>
    );
};

export default FilterPageLeftBoxComponent;
