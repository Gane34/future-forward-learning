import { describe, expect, it } from 'vitest';
import { normalizeAttachmentList } from './blogService';

describe('normalizeAttachmentList', () => {
  it('splits comma-separated attachment values and removes blanks', () => {
    expect(normalizeAttachmentList('https://example.com/guide.pdf, , https://example.com/notes.pdf')).toEqual([
      'https://example.com/guide.pdf',
      'https://example.com/notes.pdf',
    ]);
  });
});
