import { model } from './model.js';
import { updateView } from './view.js';

function setTimelineTrackColor(color) {
  model.inputs.edit.timeline.textColor = color;
}

function setTimelineTextColor(color) {
  model.inputs.edit.timeline.trackColor = color;
}

function editTitle(text) {
  model.inputs.edit.timeline.title = text;
}

function editSegmentLabel(idx, text) {
  model.inputs.edit.timeline.segments[idx].label = text;
}

function moveSegmentUp(idx) {
  const arr = model.inputs.edit.timeline.segments;
  if (idx === 0) return;
  [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
  recalcPositions(arr);

}
function moveSegmentDown(idx) {
  const arr = model.inputs.edit.timeline.segments;
  if (idx === arr.length - 1) return;
  [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
  recalcPositions(arr);
}

function deleteSegment(idx) {
  const arr = model.inputs.edit.timeline.segments;
  arr.splice(idx, 1);
  recalcPositions(arr);
}

function addSegment() {
  const arr = model.inputs.edit.timeline.segments;
  arr.push({ id: 's' + Date.now(), label: 'Nytt punkt', position: 100 });
  recalcPositions(arr);
}

/* ---- lagre & forkast ---- */
function saveTimeline() {
  const id = model.app.activeTimelineId;
  const index = model.timelines.findIndex(t => t.id === id);
  if (index === -1) return alert('Ukjent tidslinje');

  // kopier arbeidskopi → hovedmodell
  model.timelines[index] = structuredClone(model.inputs.edit.timeline);
  model.timelines[index].updatedAt = new Date().toISOString();

  model.app.currentPage = 'main';
  updateView();
}

function discardChanges() {
  model.inputs.edit = {};       // kast arbeidskopi
  model.app.currentPage = 'main';
  updateView();
}

function recalcPositions(segArr) {
  const n = segArr.length;
  for (let i = 0; i < n; i++) {
    const seg = segArr[i];
    seg.position = n === 1 ? 0 : Math.round((i * 100) / (n - 1));
  }
  updateView();
}

export { 
  setTimelineTextColor, setTimelineTrackColor, editTitle, 
  editSegmentLabel, moveSegmentUp, moveSegmentDown, deleteSegment, 
  addSegment, saveTimeline, discardChanges };