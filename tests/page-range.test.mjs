import test from 'node:test';
import assert from 'node:assert/strict';

import { parsePageRangeSelection } from '../js/pdf-processing.js';

test('mixed ranges and single pages parse to sorted unique 0-based indices', () => {
    assert.deepEqual(parsePageRangeSelection('1-3,5', 10), {
        pageIndices: [0, 1, 2, 4],
        invalidTokens: []
    });
});

test('duplicate and unordered tokens are deduplicated and sorted', () => {
    assert.deepEqual(parsePageRangeSelection('3,1,1-2', 10), {
        pageIndices: [0, 1, 2],
        invalidTokens: []
    });
});

test('partially invalid input keeps the valid pages and reports the rest', () => {
    assert.deepEqual(parsePageRangeSelection('2,zz,9-4', 10), {
        pageIndices: [1],
        invalidTokens: ['zz', '9-4']
    });
});

test('input with zero valid tokens yields no indices, not all pages', () => {
    assert.deepEqual(parsePageRangeSelection('a,99,0', 5), {
        pageIndices: [],
        invalidTokens: ['a', '99', '0']
    });
});

test('out-of-range bounds are rejected', () => {
    assert.deepEqual(parsePageRangeSelection('1-6', 5), {
        pageIndices: [],
        invalidTokens: ['1-6']
    });
});
