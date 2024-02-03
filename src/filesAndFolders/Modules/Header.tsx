import {Box, Button} from "@mui/material";
import TextField from "@mui/material/TextField";

interface HeaderProps {
    modalHandler: () => void;
    searchQuery: string;
    setSearchQuery: (val: string) => void;
}

const Header = ({modalHandler, searchQuery, setSearchQuery}: HeaderProps) => {
    return (
        <>
            <Box sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                <Button variant="outlined" onClick={modalHandler}>Create</Button>
                <TextField label="Search"
                           variant="standard"
                           value={searchQuery}
                           onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Box>
        </>
    )
}

export default Header
