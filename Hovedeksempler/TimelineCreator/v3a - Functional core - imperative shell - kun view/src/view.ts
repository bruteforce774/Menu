import { updateViewEdit } from './editView';
import { updateViewMain } from './mainView';
import { model } from './model';

function updateView() {
    if (model.app.currentPage === 'edit') updateViewEdit();
    else updateViewMain();
}

export { updateView };