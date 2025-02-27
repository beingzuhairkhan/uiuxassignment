// import { databases } from "../appwrite"

// export const getTodoGroupedByColumns = async ()=>{
//     const data = await databases.listDocuments(
//         process.env.NEXT_PUBLIC_DATABASE_ID!,
//         process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
//     )

//     console.log(data);
// }

import { databases } from '../appwrite'
import {TypedColumns , Columns , Board} from '../typings'
export const getTodoGroupedByColumns = async () => {
    try {
        const data = await databases.listDocuments(
            "67a46cdd00247269b857",
            "67a46d08000404cbdfe5"
        );
        const todos = data.documents;
        //console.log("id" , todos)
        const columns = todos.reduce((acc , todo)=>{
           if(!acc.get(todo.status)){
            acc.set(todo.status , {
                id:todo.status,
                todos:[]
            })
           }
           acc.get(todo.status)!.todos.push({
           // console.log("id" , todo.$id),
            $id:todo.$id,
            $createdAt:todo.$createdAt,
            $title:todo.title,
            status:todo.status,
           ...(todo.image && {image: JSON.parse(todo.image)}),
            
 
           });
           return acc;
        }, new Map<TypedColumns, Columns> )
      //  console.log("columns" , columns)
        const columnTypes: TypedColumns[] = ["todo", "inprogress", "done" , "Backlog"];
        columnTypes.forEach((type) => {
            if (!columns.get(type)) {
                columns.set(type, {
                    id: type,
                    todos: [],
                });
            }
        });

        const sortedColumns = new Map(
          //  [...columns.entries()].sort((a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0]))
          Array.from(columns.entries()).sort((a,b)=>(
            columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
          ))
        )

        const board:Board = {
            columns:sortedColumns,
        }
        return board
     //   console.log("data" , board)
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
