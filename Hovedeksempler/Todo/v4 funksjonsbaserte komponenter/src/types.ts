interface AppState {
    tasks: Task[];
}

interface Task {
    description: string;
    isFinished: boolean;
}

// type DispatchFunction = (action: string, value: any) => void;

type DispatchFunction = {
    (action: 'deleteTask', value: number) : void;
    (action: 'toggleTaskDone', value: number) : void;
    (action: 'addTask', value: string) : void;
};

export type { AppState, Task, DispatchFunction };