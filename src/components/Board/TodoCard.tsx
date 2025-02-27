
import type { DraggableProvidedDraggableProps , DraggableProvidedDragHandleProps} from 'react-beautiful-dnd';
import {Todo,TypedColumns} from '../../../typings'
import { XCircleIcon   } from '@heroicons/react/24/solid';
import { useBoardStore } from '../../../store/BoardStore';
import { useEffect, useState } from 'react';
import getURL from '../../../lib/getUrl'
type Props = {
    todo:Todo;
    index:number;
    id:TypedColumns;
    innerRef: (element: HTMLElement | null) => void;
    draggableProps:DraggableProvidedDraggableProps;
    dragHandleProps:DraggableProvidedDragHandleProps | null | undefined
}


const TodoCard = ({todo , index , id , innerRef , draggableProps ,dragHandleProps }:Props)=>{
    const deleteTask = useBoardStore((state)=> state.deleteTask)
    const [imageURl , setImageURL] = useState<string | null>(null);

    useEffect(()=>{
        if(todo.image){
            const fechImage = async ()=>{
                if (todo.image) {
                    const url = await getURL(todo.image)
                    if (url) {
                        setImageURL(url.toString())
                    }
                }
                
            }
            fechImage()
        }
        
    },[todo])
    return(
        <>
        <div className="bg-white rounded-md space-y-2 drop-shadow-md mt-4 "
       ref={innerRef}
        {...draggableProps} {...dragHandleProps} 
        >
       <div className="flex justify-between items-center p-3" >
        <p > {todo.$title} </p>
        <button onClick={()=> deleteTask(index , todo , id)} className="text-red-500 cursor-pointer hover:text-red-600 " >
            <XCircleIcon className="ml-5 h-8 w-8 " />
        </button>
       </div>
        {imageURl && (
            <img className="w-full h-48 object-cover rounded-md" src={imageURl} alt={todo.$title} />
        )}
        </div>
      
        </>
    )
}

export default TodoCard ;

