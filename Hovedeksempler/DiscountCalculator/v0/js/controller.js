import { model } from "./model.js";
import { updateView } from "./view.js";

const discounts = {
    percentDiscount: price => price * 0.8, // 20% rabatt
    fixedDiscount: price => price - 50, // Fast 50kr rabatt
    percentDiscountWithMax: price => Math.max(price * 0.6, price - 100) // 40% rabatt
};

function calculateDiscount() {
    const discountFunction = discounts[model.discountType];
    // console.log(discountFunction);
    model.newPrice = discountFunction(model.price);
    updateView();
}

export { calculateDiscount };