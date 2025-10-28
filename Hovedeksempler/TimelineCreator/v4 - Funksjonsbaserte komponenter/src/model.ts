import type { Model } from './types';

export const model : Model = Object.freeze({
    app: {
        activeTimelineId: null,
        currentPage: 'main',
    },
    timelines: [
        {
            id: 'tl1',
            title: 'Produktlansering Q4 2025',
            orientation: 'horizontal',
            trackColor: '#5B21B6',
            textColor: '#1F2937',
            createdAt: '2025-07-01',
            updatedAt: '2025-07-07',
            segments: [
                { id: 's1', label: 'Kick-off', position: 0 },
                { id: 's2', label: 'Beta', position: 50 },
                { id: 's3', label: 'Launch', position: 100 },
            ]
        },
        {
            id: 'tl2',
            title: 'Studentprosjekt – høst 2025',
            orientation: 'vertical',
            trackColor: '#0EA5E9',
            textColor: '#0F172A',
            createdAt: '2025-07-02',
            updatedAt: '2025-07-06',
            segments: [
                { id: 's4', label: 'Idé', position: 0 },
                { id: 's5', label: 'Prototype', position: 33 },
                { id: 's6', label: 'MVP', position: 66 },
                { id: 's7', label: 'Demo-dag', position: 100 },
            ]
        },
        {
            id: 'tl3',
            title: 'Roadmap – Læringsløp JavaScript',
            orientation: 'horizontal',
            trackColor: '#15803D',
            textColor: '#064E3B',
            createdAt: '2025-07-03',
            updatedAt: '2025-07-04',
            segments: [
                { id: 's8', label: 'Grunn-syntax', position: 0 },
                { id: 's9', label: 'DOM-manip.', position: 25 },
                { id: 's10', label: 'Fetch API', position: 50 },
                { id: 's11', label: 'Modules', position: 75 },
                { id: 's12', label: 'TypeScript', position: 100 },
            ]
        }
    ]
});
