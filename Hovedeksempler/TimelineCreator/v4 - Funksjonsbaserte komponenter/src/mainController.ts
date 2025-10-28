import { createTimelineSvg } from "./common";
import type { Model } from "./types";

function exportTimeline(model: Model, id: string): void {
  const tl = model.timelines.find(t => t.id === id);
  if (!tl) return alert('Fant ikke tidslinje');

  const svg = createTimelineSvg(tl, {
    span: 800,   // større brett
    sidePad: 80,
    fontSize: 16,
    trackWidth: 8,
    radius: 12,
  });

  const blob = new Blob([svg], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `${tl.title.replace(/\s+/g, '_')}.svg`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function previewTimeline(model: Model, timelineId: string): Model {
  const updatedModel = structuredClone(model);
  updatedModel.app.activeTimelineId = timelineId;
  return Object.freeze(updatedModel);
}

function goToEditTimeline(model: Model, id: string): Model {
  const updatedModel = structuredClone(model);
  updatedModel.app.currentPage = 'edit';
  updatedModel.app.activeTimelineId = id;
  return Object.freeze(updatedModel);
}


function deleteTimeline(model: Model, id: string): Model {
  const updatedModel = structuredClone(model);
  updatedModel.timelines = model.timelines.filter(t => t.id !== id);
  return Object.freeze(updatedModel);
}

export { exportTimeline, previewTimeline, goToEditTimeline, deleteTimeline };