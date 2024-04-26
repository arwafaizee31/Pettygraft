import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RadioButtonsGroup({options}) {
  const [value, setValue] = React.useState('');
  const handleChange = (event) => {
    setValue(event.target.value);
};
    return (
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
        <RadioGroup
        row
          aria-labelledby="demo-radio-buttons-group-label"
                value={value}
                onChange={handleChange}
                name="radio-buttons-group"
        >
         {options.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                    />
                ))}
        </RadioGroup>
      </FormControl>
    );
  }