type Model = {
    app: App;
    timelines: Timeline[];
};
type App = {
    activeTimelineId: string | null;
    currentPage: 'main' | 'edit' | 'view';
};

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

type DispatchFunction = {
    // MainView actions
    (action: 'previewTimeline', value: string): void;
    (action: 'goToEditTimeline', value: string): void;
    (action: 'deleteTimeline', value: string): void;
    (action: 'exportTimeline', value: string): void;
    // EditView actions
    (action: 'saveTimeline', value: Timeline): void;
    (action: 'discardChanges'): void;

};

export type { DispatchFunction, Model, App, Timeline, Segment };