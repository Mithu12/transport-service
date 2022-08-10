import React, {useState} from 'react';
import {Box, Button, Typography} from "@mui/material";
import CreateFavouriteFilterComponent from "./createFavouriteFilterComponent";
import FavouriteFilterListComponent from "./FavouriteFilterListComponent";

function FilterPageRightBoxComponent({transportation_types, cities}) {
    const [createFilter, setCreateFilter] = useState(false);
    const changeFilterCreateState = () => {
        setCreateFilter(state => !state)
    }
    return (
        <Box width='68%' bgcolor="#fff" height='75vh' borderRadius='10px' padding='20px'>
            {
                createFilter ? <CreateFavouriteFilterComponent closeFilterCreate={changeFilterCreateState}/> :
                    <FavouriteFilterListComponent addFilter={changeFilterCreateState}/>
            }

        </Box>
    );
}

export default FilterPageRightBoxComponent;