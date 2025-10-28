export function PointsInfo(points: number): HTMLElement {
    const element: HTMLElement = document.createElement('div');
    element.textContent = '' + points;
    return element;
}
