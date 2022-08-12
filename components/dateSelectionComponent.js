import React, {useEffect} from 'react';
import {
    Box,
    Button,
    IconButton,
    ListItem,
    ListItemButton,
    ListItemText,
    StyledEngineProvider,
    TextField
} from "@mui/material";

import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {format} from 'date-fns'
import {TimePicker} from "@mui/x-date-pickers";


function DateSelectionComponent({currentValue, setInfo, label, selectionType, stateName}) {
    const [value, setValue] = React.useState(null);

    const dateIcon = () => {
        return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M13.6757 2.30726L13.6766 2.93195C15.9721 3.11186 17.4885 4.67608 17.4909 7.07487L17.5 14.0964C17.5033 16.7117 15.8602 18.3209 13.2265 18.3251L6.79324 18.3334C4.17599 18.3367 2.51235 16.6892 2.50906 14.0664L2.50001 7.12735C2.49671 4.71272 3.95961 3.15267 6.25514 2.94194L6.25432 2.31726C6.2535 1.95077 6.52501 1.67508 6.88703 1.67508C7.24905 1.67425 7.52057 1.94911 7.52139 2.31559L7.52221 2.89863L12.4095 2.89197L12.4087 2.30893C12.4078 1.94245 12.6794 1.66758 13.0414 1.66675C13.3952 1.66592 13.6749 1.94078 13.6757 2.30726ZM3.76741 7.38472L16.2242 7.36806V7.07654C16.1888 5.28577 15.2903 4.34624 13.6777 4.20631L13.6785 4.84766C13.6785 5.20581 13.3996 5.48983 13.0458 5.48983C12.6838 5.49067 12.4115 5.20748 12.4115 4.84932L12.4106 4.17466L7.52337 4.18132L7.52419 4.85515C7.52419 5.21414 7.2535 5.49733 6.89148 5.49733C6.52946 5.49816 6.25712 5.2158 6.25712 4.85682L6.2563 4.21547C4.65189 4.37623 3.76412 5.31909 3.76658 7.12568L3.76741 7.38472ZM12.6995 11.1703V11.1795C12.7078 11.5626 13.0204 11.8533 13.3997 11.845C13.77 11.8358 14.0653 11.5185 14.0571 11.1353C14.0398 10.7689 13.7428 10.4698 13.3734 10.4707C12.9949 10.479 12.6987 10.7872 12.6995 11.1703ZM13.3794 14.9101C13.001 14.9018 12.6957 14.5861 12.6949 14.203C12.6867 13.8198 12.9903 13.5025 13.3687 13.4933H13.377C13.7637 13.4933 14.0771 13.809 14.0771 14.2005C14.078 14.5919 13.7653 14.9093 13.3794 14.9101ZM9.31014 11.1836C9.32659 11.5668 9.64007 11.8658 10.0185 11.8491C10.3888 11.8317 10.6842 11.5152 10.6677 11.132C10.6587 10.7572 10.3542 10.4657 9.98399 10.4665C9.60552 10.4832 9.30932 10.8005 9.31014 11.1836ZM10.0212 14.8726C9.64272 14.8893 9.33007 14.5903 9.31279 14.2071C9.31279 13.824 9.60816 13.5075 9.98664 13.49C10.3569 13.4892 10.6621 13.7807 10.6704 14.1547C10.6876 14.5386 10.3914 14.8551 10.0212 14.8726ZM5.91943 11.2128C5.93589 11.5959 6.24937 11.8958 6.62784 11.8783C6.99809 11.8616 7.29346 11.5443 7.27619 11.1612C7.26796 10.7863 6.96353 10.4948 6.59246 10.4957C6.21399 10.5123 5.91861 10.8297 5.91943 11.2128ZM6.63179 14.8768C6.25331 14.8943 5.94066 14.5944 5.92338 14.2113C5.92256 13.8282 6.21876 13.5108 6.59723 13.4942C6.96748 13.4933 7.27273 13.7848 7.28096 14.1597C7.29824 14.5428 7.00286 14.8601 6.63179 14.8768Z"
                  fill="#696969"/>
        </svg>
    }

    const timeIcon = () => {
        return <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M9.99996 18.3334C5.39996 18.3334 1.66663 14.6084 1.66663 10.0001C1.66663 5.40008 5.39996 1.66675 9.99996 1.66675C14.6083 1.66675 18.3333 5.40008 18.3333 10.0001C18.3333 14.6084 14.6083 18.3334 9.99996 18.3334ZM12.6586 13.0917C12.7586 13.1501 12.8669 13.1834 12.9836 13.1834C13.1919 13.1834 13.4002 13.0751 13.5169 12.8751C13.6919 12.5834 13.6002 12.2001 13.3002 12.0167L10.3336 10.2501V6.40008C10.3336 6.05008 10.0502 5.77508 9.70855 5.77508C9.36689 5.77508 9.08355 6.05008 9.08355 6.40008V10.6084C9.08355 10.8251 9.20022 11.0251 9.39189 11.1417L12.6586 13.0917Z"
                  fill="#696969"/>
        </svg>

    }
    useEffect(() => {
        if (value) {
            if (selectionType)
                setInfo(stateName, format(value, 'hh:mm'))
            else
                setInfo(stateName, format(value, 'yyyy-MM-dd'))
        }
    }, [value]);

    console.log(value)

    return (
        <>
            <ListItem
                sx={{borderRadius: '10px', width: '48%', background: '#F8F8F8', mb: '20px', position: 'relative'}}

                secondaryAction={
                    <IconButton edge="end" aria-label="comments">
                        {selectionType ? timeIcon() : dateIcon()}
                    </IconButton>
                }
                disablePadding
            >
                <StyledEngineProvider injectFirst>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        {selectionType ?
                            <TimePicker

                                value={value}
                                onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                                renderInput={(params) => <TextField value={''} sx={{
                                    background: '#F8F8F8',
                                    opacity: 0,
                                    position: 'absolute',
                                    zIndex: 10
                                }} size={'small'} {...params} />}
                            />
                            :
                            <DatePicker
                               value={value}

                                onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                                renderInput={(params) => <><TextField value={''} sx={{
                                    background: '#F8F8F8',
                                    opacity: 0,
                                    position: 'absolute',
                                    zIndex: 10
                                }} size={'small'} {...params} />
                                </>}
                            />}
                    </LocalizationProvider>
                </StyledEngineProvider>
                <ListItemButton role={undefined} dense>
                    <ListItemText sx={{color: '#9E9E9E'}}
                                  primary={value ? (selectionType ? format(value, 'hh:mm') : format(value, 'yyyy-MM-dd')) : label}/>
                </ListItemButton>
            </ListItem>
        </>
    );
}

export default DateSelectionComponent;