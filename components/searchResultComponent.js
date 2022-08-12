import React, {useEffect, useState} from 'react';
import {useGetFilterDataQuery, useSearchByFilterQuery} from "../store/services/userApi";
import {
    Box,
    Chip,
    CircularProgress,
    IconButton,
    InputBase,
    Typography
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import LinearProgress from "@mui/material/LinearProgress";
import {useDispatch, useSelector} from "react-redux";
import {setFilterInfo} from "../store/services/authSlice";
import {useRouter} from "next/router";

function SearchResultComponent() {
    const [searchData, setSearchData] = useState({
        search_type: '',
        search_text: '',
        type: '',
        city: '',
        transport_type: '',
        start_date: '',
        end_date: '',
        start_time: '',
        end_time: '',
    });

    const dispatch = useDispatch()
    const router = useRouter()

    const {selected, sr} = router.query

    const {data, isLoading, isFetching} = useSearchByFilterQuery(searchData)

    const {data: savedFilters} = useGetFilterDataQuery()

    const {filterInfo} = useSelector(state => state.userInfo)
    useEffect(() => {
        if (filterInfo) {
            setSearchData(state => ({
                ...state,
                type: filterInfo.requestType,
                city: filterInfo.city?.length ? filterInfo.city[0] : '',
                transport_type: filterInfo.transportationName,
                start_date: filterInfo.start_date,
                end_date: filterInfo.end_date,
                start_time: filterInfo.start_time,
                end_time: filterInfo.end_time,
            }))
        }

    }, [filterInfo]);

    useEffect(() => {
        if (selected && !sr) {
            const selectedFilterData = savedFilters?.filters?.find(f => f.id === Number(selected))

            dispatch(setFilterInfo({
                requestType: selectedFilterData.request_type,
                city: selectedFilterData.city,
                transportationName: selectedFilterData.transportation_type
            }))
        }
    }, [router.query]);


    const clearChip = (chipProp) => {
        dispatch(setFilterInfo({...filterInfo, [chipProp]: ''}))
    }

    return (
        <Box>
            <Box display='flex' flexDirection='column'>
                <Box display='flex' flexDirection='row' justifyContent='space-between'>
                    <Typography sx={{
                        fontWeight: 600, fontSize: '18px',
                        lineHeight: '27px'
                    }}>
                        Filter Result
                    </Typography>
                    <Box sx={{display: 'flex', height: '42px', mb: '24px', background: '#F8F8F8', borderRadius: '5px'}}
                         justifyContent={'space-between'}>

                        <InputBase
                            sx={{ml: 1, flex: 1, width: '280px',}}
                            placeholder="Search Google Maps"
                            inputProps={{'aria-label': 'search google maps'}}
                            onChange={(e) => setSearchData(state => ({
                                ...state,
                                search_type: 'search',
                                search_text: e.target.value
                            }))}
                        />
                        <IconButton type="submit" sx={{p: '10px'}} aria-label="search">
                            <SearchIcon/>
                        </IconButton>

                    </Box>
                </Box>
                <Box sx={{mb: '20px'}}>
                    <Box display='flex' flexWrap='wrap' gap={2}>
                        {Object.keys(filterInfo)?.map(k => {
                            let chipData = ''
                            let chipProp = k
                            if (k === 'city') {
                                if (filterInfo[k]?.length)
                                    chipData = filterInfo[k][0]
                            } else {
                                if (filterInfo[k])
                                    chipData = filterInfo[k]
                            }
                            if (chipData && k !== 'transportationType' && k !== 'selectedFilter')
                                return <><Chip size={'small'} label={chipData} onDelete={() => clearChip(chipProp)}/></>
                        })}
                        {/*{chips.map(c => <><Chip size={'small'} label={c} onDelete={() => console.log('aaa')}/></>)}*/}
                        {/*{cityChips.map(c => <><Chip size={'small'} label={c} onDelete={() => console.log('aaa')}/></>)}*/}
                    </Box>

                </Box>

            </Box>
            {(isLoading || isFetching) &&
                <Box display='flex' height='500px' justifyContent='center'
                     alignItems='center'><CircularProgress/></Box>}
            {!(isLoading || isFetching) && data && data.map(d => {
                return <Box key={d.id}
                            sx={{
                                background: '#F4FAFF',
                                padding: '13px 14px',
                                mb: '16px',
                                cursor: 'pointer',
                                borderRadius: '5px',
                                display: 'flex'
                            }}>
                    <Box marginRight='12px'>
                        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="25" cy="25" r="25" fill="white"/>
                            <path
                                d="M28.4292 16.5666L25.2932 15.0261C25.0823 14.9252 24.8439 14.9252 24.6422 15.0261L15.6836 19.4458L19.3055 21.2338L28.4292 16.5666Z"
                                fill="#696969"/>
                            <path
                                d="M15.3443 30.4124L24.2295 35.0521L24.2387 25.3783L20.7084 23.6361L20.2041 23.3886V25.901C20.2041 26.3228 19.8648 26.6621 19.4522 26.6621C19.0396 26.6621 18.7003 26.3136 18.7003 25.901V22.6367L14.9316 20.7844V29.7338C14.9316 30.0181 15.0967 30.284 15.3443 30.4124Z"
                                fill="#696969"/>
                            <path
                                d="M21.5151 22.3434L24.9903 24.049L34.2698 19.4551L30.6387 17.667L30.1435 17.4194L21.0107 22.0867L21.5151 22.3434Z"
                                fill="#696969"/>
                            <path d="M25.7514 25.3692L25.7422 35.043L35.0309 30.1923L35.0217 20.7844L25.7514 25.3692Z"
                                  fill="#696969"/>
                        </svg>
                    </Box>

                    <Box display='flex' flexDirection='column' width="100%">
                        <Typography sx={{fontWeight: 600, fontSize: '16px'}}>
                            {d.title}
                        </Typography>
                        <Typography sx={{fontWeight: 400, fontSize: '12px', color: '#454545', mb: '5px'}}>
                            {d.stops_count} Stops ({d.products_count} Packages)
                        </Typography>
                        <Box sx={{position: 'relative'}}>
                            <LinearProgress
                                sx={{height: '19px', width: '100%', borderRadius: '5px', background: '#fff',}}
                                variant="determinate" value={d.percentage}/>
                            <Typography sx={{position: 'absolute', right: 5, top: -1}}>{d.percentage}%</Typography>

                            <Typography sx={{position: 'absolute', fontSize: "12px", color: '#fff', left: 5, top: 0}}>Close
                                in {d.pickup_starts_in}</Typography>
                        </Box>
                    </Box>

                </Box>
            })}
        </Box>
    );
}

export default SearchResultComponent;