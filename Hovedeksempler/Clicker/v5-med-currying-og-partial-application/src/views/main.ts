import type { Model } from "../types";

import { ClickerSmiley } from "../components/ClickerSmiley";
import { PointsInfo } from "../components/PointsInfo";
import { listFactory, RedList, GreenList, BlueList } from "../components/ListFactory";
import {
  BuyUpgradeButton,
  BuySuperUpgradeButton,
  RandomUpgradeDowngradeButton,
} from "../components/ButtonFactory";

// CALCULATION: Pure function that creates virtual DOM tree
// Takes model and event handler, returns new DOM structure
// No side effects - just creates new elements without modifying existing DOM
export function MainView(
  model: Model,
  handleEvent: (event: string) => void
): HTMLElement {
  const mainElement: HTMLElement = document.createElement("div");
  const fruitList: HTMLElement = RedList(["Eple", "Banan", "Appelsin"]);
  const vegetableList: HTMLElement = GreenList([
    "Agurk",
    "Brokkoli",
    "Grønnkål",
  ]);
  const berryList: HTMLElement = BlueList(["Blåbær", "jordbær", "stikkelsbær"]);
  const purpleCarList: HTMLElement = listFactory("purple")([
    "Lilla BMW 1",
    "Lilla Volvo 2",
    "Lilla Audi 3",
  ]);
  mainElement.append(fruitList, vegetableList, berryList, purpleCarList);
  // const image: HTMLElement = ClickerSmiley(handleEvent)(model.smileyIndex);
  const smileyGroup = document.createElement("div");
  smileyGroup.style.display = "flex";
  smileyGroup.style.gap = "1rem";

  const image: HTMLElement = ClickerSmiley(handleEvent)(model.smileyIndex);
  smileyGroup.append(image);
  const pointsInfo: HTMLElement = PointsInfo(model.points);
  mainElement.append(smileyGroup, pointsInfo);

  // Conditional rendering based on model state (still pure - just branching logic)
  if (model.points >= 10) {
    const upgrade: HTMLElement = BuyUpgradeButton(handleEvent);
    mainElement.append(upgrade);
  }
  if (model.points >= 100) {
    const BuySuperUpgrade: HTMLElement = BuySuperUpgradeButton(handleEvent);
    mainElement.append(BuySuperUpgrade);
  }
  if (model.points >= 1000) {
    const RandomUpgradeDowngrade: HTMLElement =
      RandomUpgradeDowngradeButton(handleEvent);
    mainElement.append(RandomUpgradeDowngrade);
  }

  return mainElement;
}
