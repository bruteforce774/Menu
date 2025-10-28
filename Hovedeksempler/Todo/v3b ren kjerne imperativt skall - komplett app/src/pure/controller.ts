import type { Model } from '../types';

function deleteTask(model: Model, index: number): Model {
    const newTasks = model.tasks.filter((_, i) => i !== index);
    return Object.freeze({ ...model, tasks: newTasks });

    // const modelCopy = structuredClone(model);
    // modelCopy.tasks.splice(index, 1);
    // return Object.freeze(modelCopy);
}

function toggleTaskDone(model: Model, index: number): Model {
    const modelCopy = structuredClone(model);
    modelCopy.tasks[index].isFinished = !modelCopy.tasks[index].isFinished;
    return modelCopy;
}

function addTask(model: Model, description: string): Model {
    return Object.freeze({
        ...model,
        tasks: [...model.tasks, { description, isFinished: false }],
    });

    // const modelCopy = structuredClone(model);
    // modelCopy.tasks.push({ description, isFinished: false });
    // return modelCopy;
}


export { deleteTask, toggleTaskDone, addTask };