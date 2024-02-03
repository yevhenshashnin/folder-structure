import React, {useState, useEffect} from 'react';
import {DragItem, Folder} from "../interfaces";
import {DataType, Extensions} from "../enums";
import {deleteElementById, replaceItemInStructure} from "../helpers";
import Header from "../Modules/Header.tsx";
import FileFolderData from "../Components/FileFolderData.tsx";
import CreateModal from "../Modules/CreateModal.tsx";
import {v4 as uuidv4} from 'uuid';

// this is not json, just object. But this is structure of folders and files
const mock: Folder = {
    id: 'root',
    name: 'root',
    parent: null,
    permissions: {
        read: true, write: true, delete: false

    },
    type: DataType.FOLDER,
    children: [
        {
            id: 'folder1',
            name: 'Folder 1',
            parent: 'root',
            permissions: {
                read: true, write: true, delete: false
            },
            type: DataType.FOLDER,
            children: [
                {
                    id: 'file1',
                    name: 'file1.html',
                    parent: 'folder1',
                    permissions: {
                        read: true, write: true, delete: true
                    },
                    type: DataType.FILE
                },
                {
                    id: 'folder2',
                    name: 'Folder 2',
                    parent: 'folder1',
                    permissions: {
                        read: true, write: true, delete: true
                    },
                    type: DataType.FOLDER,
                    children: [
                        {
                            id: 'file2',
                            name: 'file2.css',
                            parent: 'folder2',
                            permissions: {
                                read: true, write: true, delete: false
                            },
                            type: DataType.FILE
                        },
                        {
                            id: 'folder3',
                            name: 'folder3',
                            parent: 'folder2',
                            type: DataType.FOLDER,
                            permissions: {
                                read: true, write: true, delete: true
                            },
                            children: []
                        },
                        {
                            id: 'folder4',
                            name: 'folder4',
                            parent: 'folder2',
                            type: DataType.FOLDER,
                            permissions: {
                                read: false, write: false, delete: true
                            },
                            children: []
                        },
                    ]
                }
            ]
        },
        {
            id: 'file4',
            name: 'file4.html',
            parent: 'root',
            permissions: {
                read: true, write: true, delete: true
            },
            type: DataType.FILE
        }
    ]
};

const initialForm = {
    type: {
        selected: DataType.FOLDER,
        options: [DataType.FOLDER, DataType.FILE]
    },
    name: {
        value: '',
        valid: false
    },
    extension: {
        selected: Extensions.HTML,
        options: [Extensions.HTML, Extensions.CSS, Extensions.JS],
    }
}

const FileAndFoldersPage = () => {
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(initialForm)
    const [root, setRoot] = useState<Folder>(mock)
    const [activeFolderId, setActiveFolderId] = useState<string>(root.id);
    const [draggable, setDraggable] = useState<DragItem | null>(null)
    const [target, setTarget] = useState<DragItem | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    //here goes api call for initial data
    // useEffect(()=>{
    //     fetchFolders().then(data=> setRoot(data))
    // },[])
    const handleOpen = () => setModal(true);
    const handleClose = () => setModal(false);
    const handleNameChange = (value: string) => {
        setForm(prevForm => ({
            ...prevForm,
            name: {
                value: value,
                valid: !!value
            }
        }));
    };
    const handleSelectChange = (fieldName: string, value: string) => {
        setForm(prevForm => ({
            ...prevForm,
            [fieldName]: {
                ...prevForm[fieldName],
                selected: value
            }
        }));
    };

    const create = () => {
        if (!form.name.value) return;

        const newInstance = {
            id: uuidv4(),
            name: form.type.selected === DataType.FILE ? `${form.name.value.trim()}.${form.extension.selected}` : form.name.value,
            parent: 'root',
            permissions: {
                read: true,
                write: true,
                delete: true
            },
            type: form.type.selected
        }
        //api call to create folder or file with newInstance
        if (form.type.selected === DataType.FOLDER) newInstance.children = [];
        setRoot(prev => ({
                ...prev,
                children: [
                    ...prev.children,
                    newInstance
                ]
            }
        ))
        setForm(initialForm);
        handleClose();
    }

    const activeFolderIdHandler = (id: string | null) => {
        let folderId = id ?? mock.id;
        setActiveFolderId(folderId)
    }


    const onDragFinish = () => {
        // here need to be api call with ids, and after success need to fetch folders again
        if (target?.id === draggable?.id || (target?.type === DataType.FILE && target?.parent === draggable?.parent)) return;
       let newData = replaceItemInStructure(root, draggable?.parent, draggable?.id, target?.id)
        setRoot(newData);
        setActiveFolderId(mock.id)
    }

    const deleteItem = (id: string) => {
        // api call to delete item
        setRoot(prev => {
            const updatedRoot = deleteElementById(prev, id);
            return {...updatedRoot};
        });
    }

    return (
        <>
            <Header
                modalHandler={handleOpen}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <FileFolderData
                searchQuery={searchQuery}
                onDragStart={setDraggable}
                onDragTarget={setTarget}
                onDragFinish={onDragFinish}
                activeId={activeFolderId}
                setActiveId={activeFolderIdHandler}
                deleteItem={deleteItem}
                key={root.id} data={root}
            />
            <CreateModal
                modal={modal}
                handleClose={handleClose}
                form={form}
                handleSelectChange={handleSelectChange}
                handleNameChange={handleNameChange}
                create={create}
            />
        </>
    );
};

export default FileAndFoldersPage;