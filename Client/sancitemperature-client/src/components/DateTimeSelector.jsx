import * as React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/it';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, itIT } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import FormLabel from './FormLabel';
import { Box, FormHelperText } from '@mui/material';

export default function DateTimeSelector(props) {
  const [value, setValue] = props.valueAccessor;

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <Box className='rr-form-container-date' sx={{ mb: 0 }}>
      {/* <FormLabel label="label" /> */}
      <LocalizationProvider
        dateAdapter={AdapterDayjs}
        adapterLocale="it"
        localeText={itIT.components.MuiLocalizationProvider.defaultProps.localeText}
        >
        <Stack spacing={3}>
          <DateTimePicker
        toolbarTitle={props.title}
            className='rr-form-input'
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField size="small" {...params} ></TextField>}
          />
        </Stack>
      </LocalizationProvider>

    </Box>
  );
}