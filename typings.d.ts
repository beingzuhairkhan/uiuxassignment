export interface Board {
    columns: Map<TypedColumns, Columns>; // Fixed: Map should point to Columns, not string
}

export type TypedColumns = "todo" | "inprogress" | "done" | "Backlog";

export interface Columns {
    id: TypedColumns;
    todos: Todo[];
}

export interface Todo {
    $id: string;
    $createdAt: string;
    $title: string;
    status: TypedColumns;
    image?: string;
}

export interface Image {
    bucketId: string;
    fileId: string;
}
