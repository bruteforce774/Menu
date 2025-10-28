import type { Timeline } from './types';

function formatDate(date: string): string {
    return new Date(date).toLocaleDateString('nb-NO', {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
    });
}

function createTimelineSvg(tl: Timeline, {
    span = 400,   // preview: litt under ½ skjermbredde
    sidePad = 60,    // nok luft til første/siste tekst
    fontSize = 12,
    trackWidth = 6,
    radius = 8,
} = {}) : string {
    const isHor = tl.orientation === 'horizontal';

    /* ---- viewBox-størrelse ---- */
    const w = isHor ? span + sidePad * 2 : 140;
    const h = isHor ? fontSize * 6 + sidePad : span + sidePad * 2;

    /* ---- posisjonshjelper (0–100 %) ---- */
    const pos = p =>
        isHor
            ? { x: sidePad + (p / 100) * span, y: h / 2 }
            : { x: 60, y: sidePad + (p / 100) * span };

    const a = pos(0), b = pos(100);

    /* ---- punkter + etiketter ---- */
    const segs = tl.segments.map(s => {
        const { x, y } = pos(s.position);
        const fill = tl.textColor;

        return isHor
            ? `<circle cx="${x}" cy="${y}" r="${radius}" fill="${fill}"/>
               <text x="${x}" y="${y - radius - 4}" text-anchor="middle" font-size="${fontSize}" 
                    fill="${tl.textColor}">
                    ${s.label}
                </text>`
            : `<circle cx="${x}" cy="${y}" r="${radius}" fill="${fill}"/>
               <text x="${x + radius + 12}" y="${y + fontSize / 3}" text-anchor="start" 
                    font-size="${fontSize}" fill="${tl.textColor}">
                    ${s.label}
                </text>`;
    }).join('');

    return /*HTML*/`
        <svg xmlns="http://www.w3.org/2000/svg"
            width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
        <style> text{font-family:sans-serif;} </style>
        <line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}"
                stroke="${tl.trackColor}" stroke-width="${trackWidth}"/>
        ${segs}
        </svg>`;
}

export { formatDate, createTimelineSvg };