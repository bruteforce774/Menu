import { updateViewEdit } from './editView.js';
import { updateViewMain } from './mainView.js';
import { model } from './model.js';

function updateView() {
    if (model.app.currentPage === 'edit') updateViewEdit();
    else updateViewMain();
}

export { updateView };