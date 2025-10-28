import { model } from "./model.js";
import { calculateDiscount } from "./controller.js";

function updateView() {
    // <h1>Rabatt Kalkulator</h1>
    const h1 = document.createElement("h1");
    h1.textContent = "Rabatt Kalkulator";
    // <label for="price">Pris:</label>
    const labelPrice = document.createElement("label");
    labelPrice.setAttribute("for", "price");
    labelPrice.textContent = "Pris:";
    // <input 
    //   type="number" 
    //   placeholder="Skriv inn pris"
    //   value="${model.price}"
    //   oninput="model.price = parseFloat(this.value)"
    // />
    const inputPrice = document.createElement("input");
    inputPrice.type = "number";
    inputPrice.placeholder = "Skriv inn pris";
    inputPrice.value = model.price;
    inputPrice.oninput = function () { model.price = this.valueAsNumber; }

    // <label for="discountType">Velg rabattype:</label>
    const labelDiscount = document.createElement("label");
    labelDiscount.setAttribute("for", "discountType");
    labelDiscount.textContent = "Velg rabattype:";
    //    <select id="discountType" onchange="model.discountType = this.value">
    //        <option ${model.discountType == 'percentDiscount' ? 'selected' : ''} value="percentDiscount">20 % rabatt</option>
    //        <option ${model.discountType == 'fixedDiscount' ? 'selected' : ''} value="fixedDiscount">50 kr rabatt</option>
    //        <option ${model.discountType == 'percentDiscountWithMax' ? 'selected' : ''} value="percentDiscountWithMax">40% rabatt, men maks. rabatt 100kr</option>
    //     </select>
    const select = document.createElement("select");
    select.onchange = function () { model.discountType = this.value; }
    const option1 = document.createElement("option");
    option1.value = "percentDiscount";
    option1.textContent = "20 % rabatt";
    if (model.discountType == 'percentDiscount') option1.selected = true;
    const option2 = document.createElement("option");
    option2.value = "fixedDiscount";
    option2.textContent = "50 kr rabatt";
    if (model.discountType == 'fixedDiscount') option2.selected = true;
    const option3 = document.createElement("option");
    option3.value = "percentDiscountWithMax";
    option3.textContent = "40% rabatt";
    if (model.discountType == 'percentDiscountWithMax') option3.selected = true;
    select.append(option1, option2, option3);

    // <button onclick="calculateDiscount()">Beregn pris</button>
    const button = document.createElement("button");
    button.onclick = calculateDiscount;
    button.textContent = "Beregn pris";

    // <h2 id="result">Ny pris: ${model.newPrice ?? ''}</h2>
    const h2 = document.createElement("h2");
    h2.textContent = `Ny pris: ${model.newPrice ?? ''}`;

    const app = document.getElementById("app");
    app.replaceChildren();
    app.append(h1, labelPrice, inputPrice, labelDiscount, select, button, h2);
}

export { updateView };