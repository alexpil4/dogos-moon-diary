import { describe, test, expect } from 'vitest';
import { moonPhaseEmoji } from './moon';
import { MoonPhase } from '../types';

describe('moonPhaseEmoji test', () => {
  test('It should return the correct emoji for all moon phases', () => {
    const testCases: { phase: MoonPhase; expected: string }[] = [
      { phase: 'New Moon', expected: '🌑' },
      { phase: 'Waxing crescent', expected: '🌒' },
      { phase: 'First quarter', expected: '🌓' },
      { phase: 'Waxing gibbous', expected: '🌔' },
      { phase: 'Full Moon', expected: '🌕' },
      { phase: 'Waning gibbous', expected: '🌖' },
      { phase: 'Last quarter', expected: '🌗' },
      { phase: 'Waning crescent', expected: '🌘' },
    ];

    testCases.forEach(({ phase, expected }) => {
      expect(moonPhaseEmoji(phase)).toBe(expected);
    });
  });
});
