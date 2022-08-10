import React, {useState} from 'react';
import {Box, Button, Typography} from "@mui/material";
import CreateFavouriteFilterComponent from "./createFavouriteFilterComponent";
import FavouriteFilterListComponent from "./FavouriteFilterListComponent";
import FilterDetailsComponent from "./filterDetailsComponent";

function FilterPageRightBoxComponent({transportation_types, cities, selectedFilterId}) {
    const [createFilter, setCreateFilter] = useState(true);
    const changeFilterCreateState = () => {
        setCreateFilter(state => !state)
    }
    // console.log(selectedFilterId)
    return (
        <Box width='68%' bgcolor="#fff" height='75vh' borderRadius='10px' padding='20px'>
            {selectedFilterId ? <FilterDetailsComponent filter={selectedFilterId}/> :
                createFilter ? <CreateFavouriteFilterComponent closeFilterCreate={changeFilterCreateState}/> :
                    <FavouriteFilterListComponent addFilter={changeFilterCreateState}/>
            }

        </Box>
    );
}

export default FilterPageRightBoxComponent;