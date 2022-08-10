import React from 'react';
import PropTypes from 'prop-types';
import {Box, Button, Typography} from "@mui/material";
import {useGetFilterDataQuery} from "../store/services/userApi";

FavouriteFilterListComponent.propTypes = {};

function FavouriteFilterListComponent({addFilter}) {
    const filters = null

    // const {data: {filters}} = useGetFilterDataQuery()

    return (
        <>
            {filters ? 'asd' :
                <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column' height='100%'>
                    <Box>
                        <Typography sx={{color: '#9E9E9E', fontSize: '18px', fontStyle: 'italic', fontWeight: 600}}>You
                            don’t have any favorite filter. Please create a filter first.</Typography>
                    </Box>

                    <Box sx={{mt: '20px',}}>
                        <Button sx={{padding: '12px 40px', background: '#47A7FF'}}
                                variant='contained'
                                onClick={addFilter}
                        >Create
                            Favorite
                            Filter</Button>
                    </Box>
                </Box>
            }
        </>

    );
}

export default FavouriteFilterListComponent;