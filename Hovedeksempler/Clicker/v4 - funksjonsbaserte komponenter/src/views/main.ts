import type { Model } from '../types';

import { ClickerSmiley } from '../components/ClickerSmiley';
import { PointsInfo } from '../components/PointsInfo';
import { BuyUpgradeButton } from '../components/BuyUpgradeButton';

export function MainView(model: Model, handleEvent: Function): HTMLElement {
    const mainElement: HTMLElement = document.createElement('div');
    const image: HTMLElement = ClickerSmiley(model.smileyIndex, handleEvent);
    const pointsInfo: HTMLElement = PointsInfo(model.points);
    mainElement.append(image, pointsInfo);
    if (model.points >= 10) {
        const upgrade: HTMLElement = BuyUpgradeButton(handleEvent);
        mainElement.append(upgrade);
    }
    return mainElement;
}
