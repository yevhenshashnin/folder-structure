import { render } from '@testing-library/react';
import FileFolderData from './FileFolderData';
import {DataType} from "../enums";

test('text is highlighted when searchQuery is provided', () => {
    const data = {
        id: '1',
        name: 'find me',
        parent: 'root',
        type: DataType.FOLDER,
        children: [],
        permissions: {
            delete: true,
            write: true,
            read: true
        },
    };

    const searchQuery = 'find';

    const { getByText } = render(
        <FileFolderData
            searchQuery={searchQuery}
            data={data}
            onDragStart={() => {}}
            onDragTarget={() => {}}
            onDragFinish={() => {}}
            activeId=""
            setActiveId={() => {}}
            deleteItem={() => {}}
        />
    );

    const highlightedText = getByText('find me');

    expect(highlightedText).toHaveStyle('background-color: yellow');
});


