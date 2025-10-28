import type { Model, Timeline } from './types';

function saveTimeline(model: Model, timeline: Timeline): Model {
  const updatedModel = structuredClone(model);
  const id = updatedModel.app.activeTimelineId;
  const index = updatedModel.timelines.findIndex(t => t.id === id);
  if (index === -1) return model;

  updatedModel.timelines[index] = timeline;
  updatedModel.timelines[index].updatedAt = new Date().toISOString();

  updatedModel.app.currentPage = 'main';
  return Object.freeze(updatedModel);
}

function discardChanges(model: Model): Model {
  const updatedModel = structuredClone(model);
  updatedModel.app.currentPage = 'main';
  updatedModel.app.activeTimelineId = null;
  return Object.freeze(updatedModel);
}

export { saveTimeline, discardChanges };