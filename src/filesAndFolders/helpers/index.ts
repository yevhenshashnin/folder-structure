import {Folder} from "../interfaces";

export const findElementById = (data: Folder, id: string): Folder | File | null => {
    if (data.id === id) {
        return data;
    }
    if (data.children && data.children.length > 0) {
        for (const child of data.children) {
            let foundElement = findElementById(child, id);
            if (foundElement) {
                return foundElement;
            }
        }
    }
    return null;
};

export const deleteElementById = (data: Folder, id: string): Folder => {
    if (!data.children) {
        return data;
    }
    const index = data.children.findIndex(child => child.id === id);
    if (index !== -1) {
        let children = structuredClone(data.children); // Assuming structuredClone is a valid function
        children.splice(index, 1);
        return {...data, children};
    } else {
        let updatedChildren = [];
        for (const child of data.children) {
            const updatedChild = deleteElementById(child, id);
            if (updatedChild) {
                updatedChildren.push(updatedChild);
            }
        }
        return {...data, children: updatedChildren};
    }
}

export const replaceItemInStructure = (structure: Folder, parentId: string, id: string, targetId: string): Folder => {
    const newStructure = structuredClone(structure);
    const sourceParent = findElementById(newStructure, parentId);
    if (!sourceParent) {
        return structure;
    }
    const sourceIndex = sourceParent.children.findIndex(child => child.id === id);
    if (sourceIndex === -1) {
        return structure;
    }

    const targetElement = findElementById(newStructure, targetId);
    if (!targetElement || !targetElement?.permissions?.write) {
        return structure;
    }
    const removedItem = sourceParent.children.splice(sourceIndex, 1)[0];
    removedItem.parent = targetElement.id;
    targetElement.children.push(removedItem);

    return newStructure;
};