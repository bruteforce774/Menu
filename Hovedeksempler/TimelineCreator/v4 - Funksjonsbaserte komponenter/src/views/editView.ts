import type { Timeline, Segment, Model, DispatchFunction } from '../types';

export function EditView(model: Model, dispatch: DispatchFunction): HTMLElement {
  const element = document.createElement('div');
  const timelineId = model.app.activeTimelineId!;
  const timeline: Timeline = model.timelines.find(t => t.id === timelineId)!;
  render();
  return element;

  function render() {
    const segs = timeline.segments;

    const rows = segs.map((seg, i) => /*HTML*/`
      <tr>
        <td style="width:60px;text-align:center">${seg.position}%</td>
        <td>
          <input id="description-${i}" type="text" value="${seg.label.replace(/"/g, '&quot;')}"/>
        </td>
        <td class="actions">
          <button id="moveUp-${i}" title="Opp">▲</button>
          <button id="moveDown-${i}" title="Ned">▼</button>
          <button id="delete-${i}" title="Slett">🗑️</button>
        </td>
      </tr>
  `).join('');

    element.innerHTML = /*HTML*/`
    <h1>Rediger tidslinje</h1>

    <section style="margin-bottom:1rem;display:flex;gap:1.5rem;flex-wrap:wrap;">
      <label>Tittel:<br>
        <input id="title" type="text" value="${timeline.title.replace(/"/g, '&quot;')}"/>
      </label>

      <label>Spor-farge:<br>
        <input id="trackColor" type="color" value="${timeline.trackColor}"/>
      </label>

      <label>Tekst-farge:<br>
        <input id="textColor" type="color" value="${timeline.textColor}"/>
      </label>
    </section>

    <table class="edit-table">
      <thead>
        <tr><th>%</th><th>Tekst</th><th>Handlinger</th></tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>

    <div style="margin-top:1rem;display:flex;gap:.75rem;flex-wrap:wrap;">
      <button id="addSegment"  style="padding:.5rem 1rem;">
        ➕ Legg til punkt
      </button>
      <button id="saveTimeline" style="padding:.5rem 1rem;">
        💾 Lagre
      </button>
      <button id="discardChanges" style="padding:.5rem 1rem;">
        ❌ Forkast
      </button>
    </div>
  `;

    addEventListeners();
  }

  function addEventListeners() {
    for (let i = 0; i < timeline.segments.length; i++) {
      // addEventListener(`description-${i}`, 'input', (e: Event) => editSegmentLabel(i, e.target!.value));
      // addEventListener(`moveUp-${i}`, 'click', () => moveSegmentUp(i));
      addEventListener(`moveDown-${i}`, 'click', () => moveSegmentDown(i));
      // addEventListener(`delete-${i}`, 'click', () => deleteSegment(i));

      // addEventListener('title', 'input', (e: Event) => editTitle(e.target!.value));
      // addEventListener('trackColor', 'input', (e: Event) => setTimelineTrackColor(e.target!.value));
      // addEventListener('textColor', 'input', (e: Event) => setTimelineTextColor(e.target!.value));
      // addEventListener('addSegment', 'click', ()=>dispatch('addSegment', segment));

      addEventListener('saveTimeline', 'click', () => dispatch('saveTimeline', timeline));
      addEventListener('discardChanges', 'click', () => dispatch('discardChanges'));
    }
  }

  type HandlerFunction = (e: Event) => void;
  function addEventListener(id: string, eventName: string, handler: HandlerFunction) {
    element.querySelector('#' + id)!.addEventListener(eventName, handler);
  }

  function moveSegmentDown(idx: number) {
    const arr = timeline.segments;
    if (idx === arr.length - 1) return;
    [arr[idx], arr[idx + 1]] = [arr[idx + 1], arr[idx]];
    recalcPositions(arr);
  }

  function recalcPositions(segArr: Segment[]) {
    const n = segArr.length;
    for (let i = 0; i < n; i++) {
      const seg = segArr[i];
      seg.position = n === 1 ? 0 : Math.round((i * 100) / (n - 1));
    }
    render();
  }
}






// function setTimelineTrackColor(color) {
//   model.inputs.edit.timeline!.textColor = color;
// }

// function setTimelineTextColor(color) {
//   model.inputs.edit.timeline.trackColor = color;
// }

// function editTitle(text) {
//   model.inputs.edit.timeline.title = text;
// }

// function editSegmentLabel(idx, text) {
//   model.inputs.edit.timeline.segments[idx].label = text;
// }

// function moveSegmentUp(idx) {
//   const arr = model.inputs.edit.timeline.segments;
//   if (idx === 0) return;
//   [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
//   recalcPositions(arr);

// }


// function deleteSegment(idx) {
//   const arr = model.inputs.edit.timeline.segments;
//   arr.splice(idx, 1);
//   recalcPositions(arr);
// }

// function addSegment() {
//   const arr = model.inputs.edit.timeline.segments;
//   arr.push({ id: 's' + Date.now(), label: 'Nytt punkt', position: 100 });
//   recalcPositions(arr);
// }



// function recalcPositions(segArr) {
//   const n = segArr.length;
//   for (let i = 0; i < n; i++) {
//     const seg = segArr[i];
//     seg.position = n === 1 ? 0 : Math.round((i * 100) / (n - 1));
//   }
//   updateView();
// }