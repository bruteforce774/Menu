interface Model {
    input: Task | null;
    tasks: Task[];
}

interface Task {
    description: string;
    isFinished: boolean;
}

export type { Model };