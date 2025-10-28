type Model = {
    app: App;
    inputs: Inputs;
    timelines: Timeline[];
};
type App = {
    activeTimelineId: string | null;
    currentPage: 'main' | 'edit' | 'view';
};
type Inputs = {
    main: InputMain;
    edit: InputEdit;
    view: InputView;
};
type InputMain = {
    sortBy: 'title' | 'createdAt' | 'updatedAt';
    sortDir: 'asc' | 'desc';
};
type InputEdit = {
    timeline: Timeline | null;
};
type InputView = {};


type Timeline = {
    id: string;
    title: string;
    orientation: 'horizontal' | 'vertical';
    trackColor: string;
    textColor: string;
    createdAt: string;  // ISO-dato
    updatedAt: string;  // ISO-dato
    segments: Segment[];
}

type Segment = {
    id: string;
    label: string;
    position: number;  // 0–100 (%)
}

export type {
    Model, App, Inputs, InputMain, InputEdit, InputView,
    Timeline, Segment
};