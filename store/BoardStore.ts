import { create } from 'zustand'
import { getTodoGroupedByColumns } from '../lib/getTodoGroupedByColumns';
import {Board , Todo , TypedColumns , Columns} from '../typings'
import { databases, ID, storage } from '../appwrite';
import uploadImage from '../lib/uploadImage'
interface BoardState {
    board:Board;
    getBoard: ()=> void 
    setBoardState:(board:Board)=> void;
    updateTodoInDB: (todo:Todo , columnId:TypedColumns  )=> void
    searchString: string
    setSearchString:(searchString:string)=> void
    deleteTask:(taskIndex:number , todoId: Todo , id:TypedColumns)=> void
    newTaskInput:string;
    setNewTaskInput:(newTaskInput:string)=> void
    newTaskType:TypedColumns;
    setNewTaskType:(columnId:TypedColumns)=> void
    image:File | null
    setImage:(image:File | null)=> void
    addTask:(todo:string , columnId:TypedColumns , image?:File | null)=> void

}

export const useBoardStore = create<BoardState>((set , get)=>({
       board: {
        columns:new Map<TypedColumns , Columns>()
       },
       searchString:"",
       setSearchString:(searchString:string)=>set({searchString}),
       getBoard:async ()=>{
            const board = await getTodoGroupedByColumns();
            set({board});
       },
       deleteTask:async (taskIndex:number , todo: Todo , id:TypedColumns)=>{
          const newColumns = new Map(get().board.columns);
          newColumns.get(id)?.todos.splice(taskIndex,1)
            set({board:{columns:newColumns}})
            if(todo.image){
                await storage.deleteFile(todo.image.bucketId , todo.image.fileId)
            }
            await databases.deleteDocument(
             "67a46cdd00247269b857",
             "67a46d08000404cbdfe5",
             todo.$id
            )
       },
       newTaskInput:"",
       setNewTaskInput:(input:string)=> set({newTaskInput:input}),
       newTaskType:"todo",
       setNewTaskType:(columnId:TypedColumns)=> set({newTaskType:columnId}),
       image:null,
       setImage:(image:File | null)=> set({image}),
       
       setBoardState:(board)=>set({board}),
         updateTodoInDB:async (todo , columnId)=>{
           await databases.updateDocument(
             "67a46cdd00247269b857",
             "67a46d08000404cbdfe5",
             todo.$id,
             {
                title:todo.$title,
                status:columnId
             }
           )
         },
         addTask:async (todo:string , columnId:TypedColumns , image?:File | null)=>{
          let file: { bucketId: string; fileId: string } | undefined;

          if(image){
            const fileUploaded = await uploadImage(image);
            if(fileUploaded){
              file = {
                bucketId:fileUploaded.bucketId,
                fileId:fileUploaded.$id
              }
            }
          }

          await databases.createDocument(
            "67a46cdd00247269b857",
            "67a46d08000404cbdfe5",
            ID.unique(),
            {
              title:todo,
              status:columnId,
              ...(file && {image : JSON.stringify(file)})
            }
          )

          set({newTaskInput:""});
          set((state)=>{
            const newColumns = new Map(state.board.columns);
            const newTodo:Todo = {
              $id: ID.unique(),
              $createdAt:new Date().toISOString(),
              $title:todo,
              status:columnId,
             ...(file && {image : file})
            }
            const column = newColumns.get(columnId)
            if(column){
              newColumns.set(columnId , {
                id:columnId,
                todos:[newTodo]
              })
            }else{
              newColumns.get(columnId)?.todos.push(newTodo)
            }
            return {board:{columns:newColumns}}
          })

         }

            

}))
