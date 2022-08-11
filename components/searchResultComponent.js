import React from 'react';
import {useSearchByFilterQuery} from "../store/services/userApi";
import {Box, Button, TextField, Typography} from "@mui/material";
import CheckboxInputComponent from "./checkboxInputComponent";
import SelectInputComponent from "./selectInputComponent";
import DeleteDialog from "./deleteDialog";

function SearchResultComponent() {
    const {data} = useSearchByFilterQuery()
    return (
        <Box>
            <Box display='flex' flexDirection='column'>
                <Box display='flex' flexDirection='row' justifyContent='space-between'>
                    <Typography sx={{fontWeight: 600, fontSize: '18px'}}>
                        Filter Result
                    </Typography>

                </Box>

            </Box>
            {data && data.map(d => {
                return <Box key={d.id}>{d.title}</Box>
            })}
        </Box>
    );
}

export default SearchResultComponent;