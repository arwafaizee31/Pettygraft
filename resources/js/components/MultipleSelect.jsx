import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Label, Title } from "@mui/icons-material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function MultipleSelect({
    options,
    label,
    selectedValues,
    setSelectedValues,
}) {
    const theme = useTheme();
    const [selectedItems, setSelectedItems] = useState(selectedValues);
    const [selectedLabels, setSelectedLabels] = useState([]);
    
    useEffect(() => {
        setSelectedItems(selectedValues);
        setSelectedLabels(selectedValues.map(selectedValue => {
            const selectedOption = options.find(option => option.value === selectedValue);
            return selectedOption ? selectedOption.label : '';
        }));
    }, [selectedValues, options]);

    const handleChange = (event) => {
        const { value } = event.target;
        setSelectedItems(value);
        setSelectedLabels(value.map(selectedValue => {
            const selectedOption = options.find(option => option.value === selectedValue);
            return selectedOption ? selectedOption.label : '';
        }));
        setSelectedValues(value);
    };

    return (
        <div>
            <FormControl sx={{ m: 0, width: "100%", maxWidth: "575px" }}>
                <InputLabel id="demo-multiple-chip-label" sx={{ zIndex: 0 }}>
                    {label}
                </InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={selectedItems}
                    onChange={handleChange}
                    input={
                        <OutlinedInput
                            id="select-multiple-chip"
                            label={label}
                        />
                    }
                    renderValue={() => (
                        <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                            {selectedLabels.map((label) => (
                                <Chip key={label} label={label} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

