import { DragDropContext, Droppable, type DropResult } from 'react-beautiful-dnd';
import { useEffect } from 'react';
import { useBoardStore } from '../../../store/BoardStore';
import Column from './Column'
import { Columns } from '../../../typings'
const Board = () => {
    const getBoard = useBoardStore((state) => state.getBoard);
    const board = useBoardStore((state) => state.board) as { columns: Map<string, { todos: any[] }> };
    const setBoard = useBoardStore((state) => state.setBoardState)
    const updateDb = useBoardStore((state)=> state.updateTodoInDB)
    const id = board?.columns
    useEffect(() => {
        getBoard(); // Fetch data once when the component mounts
    }, [getBoard]); // Add `getBoard` as a dependency

    const handleOnDragEnd = (result: DropResult) => {
        const { source, destination, type } = result;
    
        if (!destination) return;
    
        // 🟢 Handling Column Reordering
        if (type === "column") {
            const entries = Array.from(board.columns.entries());
            const [removed] = entries.splice(source.index, 1);
            entries.splice(destination.index, 0, removed);
            const reArrangedColumns = new Map(entries);
            setBoard({ ...board, columns: reArrangedColumns });
            return;
        }
    
        // 🟢 Handling Todo Movement
        const startColIndex = board.columns.get(source.droppableId);
        const finishColIndex = board.columns.get(destination.droppableId);
    
        if (!startColIndex || !finishColIndex) return;
    
        const { id: startColId, todos: startTodos } = startColIndex;
        const { id: finishColId, todos: finishTodos } = finishColIndex;
    
        const startCol: Columns = {
            id: startColId,
            todos: [...startTodos]
        };
    
        const finishCol: Columns = {
            id: finishColId,
            todos: [...finishTodos]
        };
    
        if (source.index === destination.index && startCol.id === finishCol.id) return;
    
        // Remove the dragged todo from the source column
        const [removed] = startCol.todos.splice(source.index, 1);
    
        const newColumns = new Map(board.columns);
    
        if (startCol.id === finishCol.id) {
            // 🟢 Moving within the same column
            startCol.todos.splice(destination.index, 0, removed);
            newColumns.set(startCol.id, startCol);
        } else {
            // 🟢 Moving between columns
            finishCol.todos.splice(destination.index, 0, removed);
            newColumns.set(startCol.id, { id: startCol.id, todos: startCol.todos });
            newColumns.set(finishCol.id, { id: finishCol.id, todos: finishCol.todos });
        }
    
        updateDb(removed , finishCol.id)
        setBoard({ ...board, columns: newColumns });
    };
    

    // console.log("data", board?.columns);

    return (
        <>


            <DragDropContext onDragEnd={handleOnDragEnd}>
                {board?.columns && (
                    <Droppable droppableId={id} direction="horizontal" type="column">
                        {(provided) => (
                            <div
                                className="grid grid-cols-1 p-2 mt-5 md:grid-cols-4 gap-5 max-w-7xl mx-auto"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {Array.from(board.columns.entries()).map(([id, column], index) => (
                                    <Column key={id} id={id} todos={column.todos} index={index} />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                )}
            </DragDropContext>

        </>
    );
};

export default Board;
