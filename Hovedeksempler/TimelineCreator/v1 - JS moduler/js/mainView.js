import { model } from './model.js';
import { formatDate, createTimelineSvg } from './common.js';
import {setSort, exportTimeline, previewTimeline, goToEditTimeline, deleteTimeline} from './mainController.js'; 

export function updateViewMain() {
    const vs = model.inputs.main;
    const dirMul = vs.sortDir === 'asc' ? 1 : -1;

    /* ----------  sorter kopien  ---------- */
    const timelines = [...model.timelines].sort((a, b) => {
        const val = {
            title: () => a.title.localeCompare(b.title),
            created: () => new Date(a.createdAt) - new Date(b.createdAt),
            updated: () => new Date(a.updatedAt) - new Date(b.updatedAt),
            orientation: () => a.orientation.localeCompare(b.orientation),
            count: () => a.segments.length - b.segments.length,
        }[vs.sortBy]();
        return val * dirMul;
    });

    /* ----------  bygg tabellhoder med piler  ---------- */
    const headerCols = [
        { key: 'title', label: 'Tittel' },
        { key: 'created', label: 'Opprettet' },
        { key: 'updated', label: 'Endret' },
        { key: 'orientation', label: 'Orient.' },
        { key: 'count', label: '#' },
    ];

    const thHtml = headerCols.map(c => {
        const arrow = vs.sortBy === c.key ? (vs.sortDir === 'asc' ? '▲' : '▼') : '';
        return `<th onclick="setSort('${c.key}')">${c.label} ${arrow}</th>`;
    }).join('') + '<th>Handlinger</th>';

    /* ----------  tabellrader  ---------- */
    const rowsHtml = timelines.map(tl => /*HTML*/`
    <tr ${model.app.activeTimelineId === tl.id ? 'class="selected"' : ''}>
      <td>${tl.title}</td>
      <td>${formatDate(tl.createdAt)}</td>
      <td>${formatDate(tl.updatedAt)}</td>
      <td>${tl.orientation}</td>
      <td style="text-align:center">${tl.segments.length}</td>
      <td class="actions">
        <button id="preview-${tl.id}" onclick="previewTimeline('${tl.id}')" title="Forhåndsvis">👁️</button>
        <button id="edit-${tl.id}" onclick="goToEditTimeline('${tl.id}')" title="Rediger">📝</button>
        <button id="delete-${tl.id}" onclick="deleteTimeline('${tl.id}')" title="Slett">🗑️</button>
        <button id="export-${tl.id}" onclick="exportTimeline('${tl.id}')" title="Last ned SVG">⬇️</button>
      </td>
    </tr>
  `).join('');

    /* ----------  forhåndsvisning  ---------- */
    const active = timelines.find(tl => tl.id === model.app.activeTimelineId);
    const preview = active ? createTimelineSvg(active)
        : '<p>Velg «👁️» for å forhåndsvise.</p>';
    const isVert = active && active.orientation === 'vertical';

    /* ----------  render  ---------- */
    const table = `
    <h1>Mine tidslinjer</h1>
    <table class="timeline-table">
      <thead><tr>${thHtml}</tr></thead>
      <tbody>${rowsHtml}</tbody>
    </table>`;

    const dir = isVert ? 'row' : 'column';
    document.getElementById('app').innerHTML = `
        <div style="display:flex;gap:2rem;flex-direction:${dir};">
            <div>${table}</div>
            <div >${preview}</div>
       </div>`;

    addEventListeners();
}

function addEventListeners() {
    for(let timeline of model.timelines) {
        const previewBtn = document.getElementById(`preview-${timeline.id}`);
        const editBtn    = document.getElementById(`edit-${timeline.id}`);
        const deleteBtn  = document.getElementById(`delete-${timeline.id}`);
        const exportBtn  = document.getElementById(`export-${timeline.id}`);

        //<button id="preview-${tl.id}" onclick="previewTimeline('${tl.id}')" title="Forhåndsvis">👁️</button>
        previewBtn.onclick = () => previewTimeline(timeline.id);
        //<button id="edit-${tl.id}" onclick="goToEditTimeline('${tl.id}')" title="Rediger">📝</button>
        editBtn.onclick    = () => goToEditTimeline(timeline.id);
        //<button id="delete-${tl.id}" onclick="deleteTimeline('${tl.id}')" title="Slett">🗑️</button>
        deleteBtn.onclick  = () => deleteTimeline(timeline.id);
        //<button id="export-${tl.id}" onclick="exportTimeline('${tl.id}')" title="Last ned SVG">⬇️</button>
        exportBtn.onclick  = () => exportTimeline(timeline.id);
    }
}


