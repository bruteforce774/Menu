export function ClickerSmiley(smileyIndex: number, handleEvent: Function): HTMLElement {
    const smiley: string = smileyIndex == 0 ? '😀' : '😁';
    const element: HTMLElement = document.createElement('div');
    element.textContent = smiley;
    element.addEventListener('click', () => handleEvent('click'));
    return element;
}


// function ClickerSmileyEmne2Style(smileyIndex: number): string {
//     return /*HTML*/`
//         <div>
//             ${smileyIndex == 0 ? '😀' : '😁'}
//         </div>    
//     `;
// }

