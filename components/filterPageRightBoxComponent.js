import React from 'react';
import {Box, Typography} from "@mui/material";
import CreateFavouriteFilterComponent from "./createFavouriteFilterComponent";
import FavouriteFilterListComponent from "./FavouriteFilterListComponent";
import FilterDetailsComponent from "./filterDetailsComponent";
import {useRouter} from "next/router";
import SearchResultComponent from "./searchResultComponent";

function FilterPageRightBoxComponent({}) {
    const router = useRouter()

    const {manage, selected, newF, result, sr} = router.query
    console.log(manage, selected)

    const closeFilterCreate = () => {
        router.push({
            pathName: 'services',
            query: {}
        })
    }
    const openFilterCreate = () => {
        router.push({
            pathName: 'services',
            query: {newF: 1}
        })
    }
    return (
        <Box width='68%' bgcolor="#fff" height='75vh' borderRadius='10px' padding='20px'>
            {manage && !selected ?
                <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column' height='100%'>
                    <Box>
                        <Typography sx={{color: '#9E9E9E', fontSize: '18px', fontStyle: 'italic', fontWeight: 600}}>
                            Please select a filter to manage.
                        </Typography>
                    </Box>
                </Box> : ''}
            {manage && selected ? <FilterDetailsComponent filter={selected}/> : ''}
            {result && (selected || sr) ? <SearchResultComponent filter={selected}/> : ''}
            {newF ? <CreateFavouriteFilterComponent closeFilterCreate={closeFilterCreate}/> : ''}
            {
                !manage && !newF && !result && <FavouriteFilterListComponent addFilter={openFilterCreate}/>
            }
        </Box>
    );
}

export default FilterPageRightBoxComponent;