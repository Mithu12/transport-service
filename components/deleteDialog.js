import React from 'react';
import DialogTitle from "@mui/material/DialogTitle";
import {Checkbox, DialogContentText, IconButton, ListItem, ListItemButton, ListItemText, Stack} from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";

function DeleteDialog({open, setOpen, deleteFilter}) {



    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose} fullWidth>
                <DialogTitle align={'center'} display='flex' justifyContent='center'>
                    Warning

                </DialogTitle>
                <DialogContent sx={{justifyContent: 'center', align: 'center'}}>
                    <DialogContent>
                        <DialogContentText align='center' id="alert-dialog-slide-description" color='#454545'>
                            Are you sure you want to delete this filter?
                        </DialogContentText>
                    </DialogContent>
                </DialogContent>
                <DialogActions sx={{mb: '30px', paddingX: '90px', justifyContent: 'space-between'}} display='flex'>
                    <Box>
                        <Button variant={'outlined'} sx={{padding: '12px 60px'}} onClick={handleClose}
                        >Cancel</Button>
                    </Box>
                    <Box>

                        <Button variant={'contained'} sx={{background: '#FF4E53', padding: '12px 60px'}}
                                onClick={deleteFilter}
                        >Delete</Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DeleteDialog;