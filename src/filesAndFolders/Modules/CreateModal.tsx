import MyModal from "../UI/MyModal.tsx";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import {DataType} from "../enums";
import {Box} from "@mui/material";
import Button from "@mui/material/Button";
import {Extensions} from "../enums";

interface CreateModalProps {
    modal: Boolean;
    handleClose: () => void;
    form: {
        type: {
            selected: DataType;
            options: DataType[];
        };
        name: {
            value: string;
            valid: boolean;
        };
        extension: {
            selected: Extensions;
            options: Extensions[];
        };
    };
    handleSelectChange: (fieldName: string, value: string) => void;
    handleNameChange: (val: string) => void;
    create: () => void
}


const CreateModal = ({modal, handleClose, form, handleSelectChange, handleNameChange, create}: CreateModalProps) => {
    return (
        <MyModal
            open={modal} handleClose={handleClose}
        >
            <FormControl sx={{m: 1, minWidth: 80}}>
                <InputLabel id="demo-simple-select-autowidth-label">type</InputLabel>
                <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={form.type.selected}
                    onChange={(e) => handleSelectChange('type', e.target.value)}
                    autoWidth
                    variant={"standard"}
                >
                    {form.type.options.map(type => <MenuItem key={type} value={type}>{type}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl sx={{m: 1, minWidth: 80}}>
                <TextField label="Name" variant="standard" value={form.name.value}
                           onChange={e => handleNameChange(e.target.value)}/> </FormControl>
            {form.type.selected === DataType.FILE && (
                <FormControl sx={{m: 1, minWidth: 80}}>
                    <InputLabel id="demo-simple-select-autowidth-label">extension</InputLabel>
                    <Select
                        value={form.extension.selected}
                        onChange={(e) => handleSelectChange('extension', e.target.value)}
                        autoWidth
                        variant={"standard"}
                    >
                        {form.extension.options.map(extension => <MenuItem key={extension}
                                                                           value={extension}>{extension}</MenuItem>)}
                    </Select>
                </FormControl>
            )}
            <Box sx={{width: '100%', display: 'flex', justifyContent: 'flex-end'}}>
                <Button variant="contained" onClick={create}>Create</Button>
            </Box>
        </MyModal>
    );
};

export default CreateModal;