import { DataType} from "../enums";

export interface Folder {
    id: string;
    name: string;
    parent: string | null;
    children: (Folder | File)[];
    permissions: {
        read: Boolean,
        delete: Boolean,
        write: Boolean
    };
    type: DataType.FOLDER
}

export interface File {
    id: string;
    name: string;
    parent: string;
    permissions: {
        read: Boolean,
        delete: Boolean,
        write: Boolean
    };
    type: DataType.FILE
}

export interface DragItem {
    id: string | null;
    parent: string | null;
    type: DataType.FILE | DataType.FOLDER
}