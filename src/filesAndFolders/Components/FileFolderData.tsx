import IconButton from '@mui/material/IconButton';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box'
import {Typography} from "@mui/material";
import AttachmentIcon from '@mui/icons-material/Attachment';
import {DataType} from "../enums";
import FolderIcon from '@mui/icons-material/Folder';
import React, {useEffect, useState} from "react";
import {Folder, File, DragItem} from "../interfaces";
import DeleteIcon from '@mui/icons-material/Delete';

interface FileFolderDataProps {
    searchQuery: string;
    data: Folder | File;
    onDragStart: ({id, parent}: DragItem) => void;
    onDragTarget: ({id, parent}: DragItem) => void;
    onDragFinish: () => void;
    activeId: string;
    setActiveId: (id: string | null) => void;
    deleteItem: (id: string) => void;
}

const FileFolderData = ({
                            searchQuery,
                            data,
                            onDragStart,
                            onDragTarget,
                            onDragFinish,
                            activeId,
                            setActiveId,
                            deleteItem
                        }: FileFolderDataProps) => {
    const [open, setOpen] = useState(false)
    useEffect(() => {
        if (searchQuery && data.permissions.read) {
            setOpen(true)
        }
    }, [searchQuery])
    const openHandler = () => {
        setActiveId(!open ? data.id : null);
        setOpen(!open)
    }


    return (
        <React.Fragment key={data.id}>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '50%'
                }}
                draggable={true}
                onDragStart={() => onDragStart({id: data.id, parent: data.parent, type: data.type})}
                onDragEnter={() => onDragTarget({id: data.id, parent: data.parent, type: data.type})}
                // onDragLeave={(e) => onDragTarget(e, null)}
                onDragEnd={onDragFinish}
            >
                {data.type === DataType.FOLDER && data.children?.length > 0 && data.permissions.read &&
                    <IconButton size="small" onClick={openHandler}>
                        <ArrowForwardIosIcon
                            sx={{transform: open ? 'rotate(90deg)' : 'rotate(0)'}}
                            fontSize="inherit"/>
                    </IconButton>}
                {data.type === DataType.FOLDER ?
                    <FolderIcon fontSize="inherit" sx={{color: data.id === activeId ? 'blue' : 'black'}}/>
                    :
                    <AttachmentIcon fontSize="inherit"/>
                }
                <Typography
                    sx={{
                        ml: 1,
                        backgroundColor: searchQuery && data.name.toLowerCase().includes(searchQuery.toLowerCase()) ? 'yellow' : 'transparent'
                    }}
                    component="span">{data.name}</Typography>
                <IconButton size="small" disabled={!data.permissions.delete} onClick={() => deleteItem(data.id)}>
                    <DeleteIcon fontSize="inherit"/>
                </IconButton>
            </Box>
            {
                data.type === DataType.FOLDER && data.children?.length > 0 && open && (
                    <ul style={{listStyleType: 'none'}}>
                        {
                            data.children.map((child) => (
                                <li key={child.id}>
                                    <FileFolderData
                                        searchQuery={searchQuery}
                                        data={child}
                                        deleteItem={deleteItem}
                                        onDragStart={onDragStart}
                                        onDragTarget={onDragTarget}
                                        activeId={activeId}
                                        setActiveId={setActiveId}
                                        onDragFinish={onDragFinish}
                                    />
                                </li>
                            ))
                        }
                    </ul>
                )
            }
        </React.Fragment>
    )
        ;

};

export default FileFolderData;
