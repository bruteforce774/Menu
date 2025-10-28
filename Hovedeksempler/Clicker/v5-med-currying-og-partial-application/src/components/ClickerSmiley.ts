// export function ClickerSmiley(smileyIndex: number, handleEvent: Function): HTMLElement {
//     const smiley: string = smileyIndex == 0 ? '😀' : '😁';
//     const element: HTMLElement = document.createElement('div');
//     element.textContent = smiley;
//     element.addEventListener('click', () => handleEvent('click'));
//     return element;
// }


// function ClickerSmileyEmne2Style(smileyIndex: number): string {
//     return /*HTML*/`
//         <div>
//             ${smileyIndex == 0 ? '😀' : '😁'}
//         </div>    
//     `;
// }


// CALCULATION: Curried factory function - pure at each level
// Takes smilies array, returns a function that takes dispatch, 
// which returns a function that creates smiley elements
export const createSmileyFactory =
    (smilies: string[]) =>
    (dispatch: (event: string) => void) => {
        // CALCULATION: Pure function that creates DOM elements
        const createSmiley = (smileyIndex: number): HTMLDivElement => {
            const smiley = smilies[smileyIndex] ?? smilies[0];
            const element = document.createElement('div');
            element.textContent = smiley;
            // ACTION: addEventListener registers a callback (side effect when clicked)
            element.addEventListener('click', () => dispatch('click'));
            return element;
        };
        return createSmiley;
    };

// DATA: Partially applied function - configured with specific smiley set
export const ClickerSmiley = createSmileyFactory(['😀', '😁']);
