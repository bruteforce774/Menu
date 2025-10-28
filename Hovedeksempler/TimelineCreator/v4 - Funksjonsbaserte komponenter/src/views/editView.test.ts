import { expect, test, vi } from 'vitest';
import type { Segment, Model } from '../types';
import { EditView } from './editView';

test('emit click', () => {
    // Arrange
    const handleEvent = vi.fn();

    const model: Model = Object.freeze({
        app: {
            activeTimelineId: 'tl1',
            currentPage: 'edit',
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
        ]
    });


    // Act 
    const element = EditView(model, handleEvent);
    element.querySelector<HTMLButtonElement>('#moveDown-0')!.click();
    element.querySelector<HTMLButtonElement>('#saveTimeline')!.click();

    // Assert
    const [type, timeline] = handleEvent.mock.calls[0];
    expect(timeline.segments.map((s: Segment) => s.label))
        .toEqual(['Beta', 'Kick-off', 'Launch']);
});