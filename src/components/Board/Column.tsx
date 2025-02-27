import { Droppable, Draggable } from "react-beautiful-dnd";
import TodoCard from './TodoCard'
import { Todo } from '../../../typings'
import { PlusIcon   } from '@heroicons/react/24/solid';
import { useBoardStore } from "../../../store/BoardStore";
import Modal from './Modal'
import { useState } from "react";
const idToColumnText: { [key in 'todo' | 'inprogress' | 'done' | 'Backlog']: string } = {
  todo: "To Do",
  inprogress: "In Progress",
  done: "Done",
  Backlog: "Backlog"
};




interface ColumnProps {
  id: 'todo' | 'inprogress' | 'done' | 'Backlog';
  todos: Todo[];
  index: number;
}

const Column = ({ id, todos, index }: ColumnProps) => {
     const [searchString] = useBoardStore((state)=>state.searchString)
     const [open , setOpen] = useState(false)
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        //className="p-4 bg-gray-200 rounded-lg shadow-md"
        >
         

          <Droppable droppableId={id.toString()} type="card">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`p-3 rounded-2xl shadow-sm cursor-pointer ${snapshot.isDraggingOver ? "bg-green-100" : "bg-gray-200/50 p-2"}`}
              
              >
                <h2 className="flex justify-between font-bold" >   {idToColumnText[id]}
                  <span className="text-gray-500 font-normal bg-gray-200 rounded-full px-2 py-2 text-sm  " > {!searchString ? todos.length : todos.filter(todo=> todo.$title.toLowerCase().includes(searchString.toLowerCase())).length} </span> </h2>
                <div className="space-y-2" >
                  {todos.map((todo, index) =>{
                    if(searchString && !todo.$title.toLowerCase().includes(searchString.toLowerCase())) return null
                    return  (
                      <Draggable key={todo.$id} draggableId={todo.$id} index={index} >
                        {(provided) => (
                          <TodoCard
                            todo={todo}
                            index={index}
                            id={id}
                            innerRef={provided.innerRef}
                            draggableProps={provided.draggableProps}
                            dragHandleProps={provided.dragHandleProps}
  
                          />
                        )}
  
                      </Draggable>
                    )
                  }
                  )}
                  {provided.placeholder}
               
                    <div className="flex justify-end  " >
                      <button onClick={()=> setOpen(!open)} className="text-white rounded-full bg-green-600 mt-2 " >
                           <PlusIcon className="h-6 w-6 " />
                           </button>
                    </div>
                   

                </div>
                {
                open && <Modal  setOpen={setOpen} />
              }
              </div>
           
           
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;


// {todos.map((todo, idx) => (
//   <Draggable key={todo.$id} draggableId={todo.$id} index={idx}>
//     {(provided) => (
//       <div
//         ref={provided.innerRef}
//         {...provided.draggableProps}
//         {...provided.dragHandleProps}
//         className="p-2 bg-white shadow-md rounded-md my-2 cursor-pointer"
//       >
//         {todo.$title}
//       </div>
//     )}
//   </Draggable>
// ))}
// {provided.placeholder}