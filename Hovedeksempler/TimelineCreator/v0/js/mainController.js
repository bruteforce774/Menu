function setSort(key) {
  const vs = model.inputs.main;
  if (vs.sortBy === key) {
    vs.sortDir = vs.sortDir === 'asc' ? 'desc' : 'asc';
  } else {
    vs.sortBy = key;
    vs.sortDir = 'asc';
  }
  updateView();
}

function exportTimeline(id) {
  const tl = model.timelines.find(t => t.id === id);
  if (!tl) return alert('Fant ikke tidslinje');

  const svg = createTimelineSvg(tl, {
    span:       800,   // større brett
    sidePad:    80,
    fontSize:   16,
    trackWidth: 8,
    radius:     12,
  });

  const blob = new Blob([svg], { type: 'image/svg+xml' });
  const url  = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `${tl.title.replace(/\s+/g,'_')}.svg`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function previewTimeline(timelineId) {
    model.app.activeTimelineId = timelineId;
    updateView();
}

function goToEditTimeline(id) { 
    model.app.currentPage = 'edit';
    model.app.activeTimelineId = id;
    const original = model.timelines.find(t => t.id === id);
    model.inputs.edit.timeline = structuredClone(original);
    updateView();
}


function deleteTimeline(id) { 
  model.timelines = model.timelines.filter(t => t.id !== id);
  updateView();
}