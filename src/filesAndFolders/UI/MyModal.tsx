import React from "react";
import Box from "@mui/material/Box";
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface MyModalProps {
    open: Boolean;
    handleClose: () => void;
    children: React.ReactNode;
}

const MyModal = ({open, handleClose, children}: MyModalProps) => {
    return (<Modal
        keepMounted
        open={open}
        onClose={handleClose}
    >
        <Box sx={style}>
            {children}
        </Box>
    </Modal>)
}

export default MyModal;