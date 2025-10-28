// CALCULATION: Pure function - creates a DOM element but doesn't modify existing DOM
// Takes points, returns a new element (no side effects, deterministic)
export function PointsInfo(points: number): HTMLElement {
    const element: HTMLElement = document.createElement('div');
    element.textContent = '' + points;
    return element;
}
