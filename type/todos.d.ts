enum TodoStatus {
    PENDING = "PENDING",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED"
}

type Todos = {
    id: string;
    title: string;
    description: string;
    status: TodoStatus;
    createdAt: Date;
    updatedAt: Date;
}