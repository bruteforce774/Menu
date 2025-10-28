import type { AppState } from "./types";

const state: AppState = Object.freeze({
    tasks: [
        {
            description: 'Lage model',
            isFinished: true,
        },
        {
            description: 'Lage view',
            isFinished: false,
        },
        {
            description: 'Lage controller',
            isFinished: false,
        },
        {
            description: 'Lage index.html',
            isFinished: true,
        },
    ],
});

export { state };