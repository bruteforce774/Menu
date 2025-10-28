import { model } from './model';
import {
  setTimelineTextColor, setTimelineTrackColor, editTitle,
  editSegmentLabel, moveSegmentUp, moveSegmentDown, deleteSegment, addSegment,
  saveTimeline, discardChanges
} from './editController.js';
import type { Timeline } from './types.js';

export function updateViewEdit() {
  const tl: Timeline = model.inputs.edit.timeline!;
  const segs = tl.segments;

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

  document.getElementById('app')!.innerHTML = /*HTML*/`
    <h1>Rediger tidslinje</h1>

    <section style="margin-bottom:1rem;display:flex;gap:1.5rem;flex-wrap:wrap;">
      <label>Tittel:<br>
        <input id="title" type="text" value="${tl.title.replace(/"/g, '&quot;')}"/>

      </label>

      <label>Spor-farge:<br>
        <input id="trackColor" type="color" value="${tl.trackColor}"/>
      </label>

      <label>Tekst-farge:<br>
        <input id="textColor" type="color" value="${tl.textColor}"/>
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
  for (let i = 0; i < model.inputs.edit.timeline!.segments.length; i++) {
    addEventListener(`description-${i}`, 'input', (e: Event) => editSegmentLabel(i, e.target!.value));
    addEventListener(`moveUp-${i}`, 'click', () => moveSegmentUp(i));
    addEventListener(`moveDown-${i}`, 'click', () => moveSegmentDown(i));
    addEventListener(`delete-${i}`, 'click', () => deleteSegment(i));

    addEventListener('title', 'input', (e: Event) => editTitle(e.target!.value));
    addEventListener('trackColor', 'input', (e: Event) => setTimelineTrackColor(e.target!.value));
    addEventListener('textColor', 'input', (e: Event) => setTimelineTextColor(e.target!.value));

    addEventListener('addSegment', 'click', addSegment);
    addEventListener('saveTimeline', 'click', saveTimeline);
    addEventListener('discardChanges', 'click', discardChanges);
  }
}

type HandlerFunction = (e: Event) => void;
function addEventListener(id: string, eventName: string, handler : HandlerFunction) {
  document.getElementById(id)?.addEventListener(eventName, handler);
}