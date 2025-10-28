import { formatDate, createTimelineSvg } from '../common';
import type { Timeline, Model, DispatchFunction } from '../types';

export function MainView(model: Model, dispatch: DispatchFunction): HTMLElement {
  type SortKey = 'title' | 'created' | 'updated' | 'orientation' | 'count';
  type SortDirection = 'asc' | 'desc';
  let sortBy: SortKey = 'title';
  let sortDir: SortDirection = 'asc';

  const element = document.createElement('div');
  render();
  return element;

  function setSort(key: SortKey) {
    if (sortBy === key) {
      sortDir = sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      sortBy = key;
      sortDir = 'asc';
    }
    render();
  }

  function render(): void {
    /* ----------  sorter kopien  ---------- */
    const dirMul = sortDir === 'asc' ? 1 : -1;
    const timelines = [...model.timelines].sort((a: Timeline, b: Timeline) => {
      const val = {
        title: () => a.title.localeCompare(b.title),
        created: () => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        updated: () => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
        orientation: () => a.orientation.localeCompare(b.orientation),
        count: () => a.segments.length - b.segments.length,
      }[sortBy]();
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

    const headerElements = document.createElement('tr');
    for (let col of headerCols) {
      const th = document.createElement('th');
      const arrow = sortBy === col.key ? (sortDir === 'asc' ? '▲' : '▼') : '';
      th.textContent = col.label + ' ' + arrow;
      th.onclick = () => setSort(col.key as SortKey);
      headerElements.append(th);
    }
    const actionsTh = document.createElement('th');
    actionsTh.textContent = 'Handlinger';
    headerElements.append(actionsTh);


    // const thHtml = headerCols.map(c => {
    //     const arrow = sortBy === c.key ? (sortDir === 'asc' ? '▲' : '▼') : '';
    //     return `<th onclick="setSort('${c.key}')">${c.label} ${arrow}</th>`;
    // }).join('') + '<th>Handlinger</th>';

    /* ----------  tabellrader  ---------- */
    const rowsHtml = timelines.map(tl => /*HTML*/`
    <tr ${model.app.activeTimelineId === tl.id ? 'class="selected"' : ''}>
      <td>${tl.title}</td>
      <td>${formatDate(tl.createdAt)}</td>
      <td>${formatDate(tl.updatedAt)}</td>
      <td>${tl.orientation}</td>
      <td style="text-align:center">${tl.segments.length}</td>
      <td class="actions">
        <button id="preview-${tl.id}" title="Forhåndsvis">👁️</button>
        <button id="edit-${tl.id}"  title="Rediger">📝</button>
        <button id="delete-${tl.id}" title="Slett">🗑️</button>
        <button id="export-${tl.id}" title="Last ned SVG">⬇️</button>
      </td>
    </tr>
  `).join('');

    /* ----------  forhåndsvisning  ---------- */
    const active = timelines.find(tl => tl.id === model.app.activeTimelineId);
    const preview = active ? createTimelineSvg(active)
      : '<p>Velg «👁️» for å forhåndsvise.</p>';
    const isVert = active && active.orientation === 'vertical';

    /* ----------  render  ---------- */
    const dir = isVert ? 'row' : 'column';
    element.innerHTML = /*HTML*/`
        <div style="display:flex;gap:2rem;flex-direction:${dir};">
            <div>
              <h1>Mine tidslinjer</h1>
              <table class="timeline-table">
                <thead>
                  <tr id="header"></tr>
                </thead>
                <tbody>${rowsHtml}</tbody>
              </table>            
            </div>
            <div >${preview}</div>
       </div>`;

    element.querySelector('#header')!.replaceWith(headerElements);

    addEventListeners(element, model, dispatch);
  }
}

function addEventListeners(element: HTMLElement, model: Model, dispatch: DispatchFunction): void {
  for (let timeline of model.timelines) {
    const previewBtn = element.querySelector<HTMLButtonElement>(`#preview-${timeline.id}`)!;
    const editBtn = element.querySelector<HTMLButtonElement>(`#edit-${timeline.id}`)!;
    const deleteBtn = element.querySelector<HTMLButtonElement>(`#delete-${timeline.id}`)!;
    const exportBtn = element.querySelector<HTMLButtonElement>(`#export-${timeline.id}`)!;

    previewBtn.onclick = () => dispatch('previewTimeline', timeline.id);
    editBtn.onclick = () => dispatch('goToEditTimeline', timeline.id);
    deleteBtn.onclick = () => dispatch('deleteTimeline', timeline.id);
    exportBtn.onclick = () => dispatch('exportTimeline', timeline.id);
  }
}


