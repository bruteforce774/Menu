export const listFactory = 
    (color: string) => 
    (items: string[]): HTMLUListElement => {
        const element = document.createElement('ul');
        element.style.color = color;
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            element.appendChild(li);
        });
        return element;
    };

// Partially applied functions - pure until items are provided
export const RedList = listFactory('red');
export const GreenList = listFactory('green');
export const BlueList = listFactory('blue'); 
