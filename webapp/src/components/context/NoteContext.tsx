import React from 'react';

interface Note{
    id: number,
    title: string,
    content: string,
}

const NoteContext = React.createContext<Note>({
    id: 0,
    title: '',
    content: ''
})

export default NoteContext;