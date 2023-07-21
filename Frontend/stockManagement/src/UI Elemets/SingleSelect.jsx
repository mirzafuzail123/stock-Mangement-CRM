import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { ListSubheader, TextField, InputAdornment } from '@mui/material';
import SearchIcon from "@mui/icons-material/search";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            backgroundColor: 'var(--bg-gray-50)',
            border: '1px solid var(--border-gray-300)',

        },

    },
};




export default function SingleSelect({ options, returnValue, setreturnValue, fieldWidth }) {
    const theme = useTheme();
    const [SearchValue, setSearchValue] = useState(null)
    const [SearchedData, setSearchedData] = useState([])

    const handleSearchChange = (e) => {
        setSearchValue(e.target.value)
        setSearchedData(options.filter((option) => option.name.toLowerCase().includes(e.target.value.toLowerCase())))
    }


    return (
        <div>
            <FormControl sx={{ m: 1, width: fieldWidth, zIndex: 40 }}>
                <Select
                    size='small'

                    id="demo-multiple-chip"
                    value={returnValue}
                    color="error"
                    onChange={(e) => setreturnValue(e.target.value)}
                    // color='warning'
                    style={{ fontSize: '0.80rem', borderRadius: "0.5rem", height: "45px", }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary focus:border-primary focus:outline-none block w-full p-2.5 "
                    MenuProps={{ style: { zIndex: 50 } }}                >
                    <ListSubheader>
                        <TextField
                            style={{ fontSize: '0.8rem', borderRadius: "0.5rem", height: "8px", }}
                            size="small"
                            color="error"
                            autoFocus
                            placeholder="Type to search..."
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                )
                            }}
                            onChange={handleSearchChange}
                            onKeyDown={(e) => {
                                if (e.key !== "Escape") {
                                    // Prevents autoselecting item while typing (default Select behaviour)
                                    e.stopPropagation();
                                }
                            }}
                        />
                    </ListSubheader>
                    {(SearchValue ? SearchedData : options).map((option, index) => (
                        <MenuItem
                            className='z-50'
                            key={index}
                            id={option.name}
                            value={option.id}
                            style={{ fontSize: '0.80rem' }}
                        >
                            {option.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div >
    );
}
