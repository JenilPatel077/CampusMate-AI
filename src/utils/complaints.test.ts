import test from 'node:test';
import assert from 'node:assert/strict';
import {
  generateComplaintId,
  validateComplaint,
  calculateComplaintStats,
  filterComplaints,
} from './complaints';
import { Complaint } from '../types';

const sampleComplaints: Complaint[] = [
  {
    id: 'CMP-2026-1001',
    title: 'Wi-Fi connection down in Library',
    category: 'Internet/Wi-Fi',
    description: 'Cannot connect to student network on 2nd floor.',
    location: 'Central Library Floor 2',
    priority: 'High',
    status: 'In Progress',
    createdAt: '2026-10-20T10:00:00Z',
    updatedAt: '2026-10-21T10:00:00Z',
  },
  {
    id: 'CMP-2026-1002',
    title: 'Broken desk in LH-02',
    category: 'Classroom',
    description: 'Arm rest broken in third row seat 4.',
    location: 'Lecture Hall 02',
    priority: 'Low',
    status: 'Resolved',
    createdAt: '2026-10-18T10:00:00Z',
    updatedAt: '2026-10-19T10:00:00Z',
  },
  {
    id: 'CMP-2026-1003',
    title: 'Water cooler leaking',
    category: 'Water Supply',
    description: 'Water leaking continuously causing slipping risk.',
    location: 'Hostel Block B Ground Floor',
    priority: 'Urgent',
    status: 'Submitted',
    createdAt: '2026-10-25T10:00:00Z',
    updatedAt: '2026-10-25T10:00:00Z',
  },
];

test('generateComplaintId creates sequential unique ID with current year', () => {
  const currentYear = new Date().getFullYear();
  const nextId = generateComplaintId(sampleComplaints);
  assert.equal(nextId, `CMP-${currentYear}-1004`);

  // Empty list default
  const emptyListId = generateComplaintId([]);
  assert.equal(emptyListId, `CMP-${currentYear}-1001`);
});

test('validateComplaint rejects empty fields', () => {
  const res = validateComplaint({});
  assert.equal(res.isValid, false);
  assert.ok(res.errors.title);
  assert.ok(res.errors.category);
  assert.ok(res.errors.description);
  assert.ok(res.errors.location);
});

test('validateComplaint accepts valid fields and enforces minimum lengths', () => {
  const tooShort = validateComplaint({
    title: 'Bad',
    category: 'Classroom',
    description: 'Short',
    location: 'AB',
  });
  assert.equal(tooShort.isValid, false);
  assert.ok(tooShort.errors.title);
  assert.ok(tooShort.errors.description);
  assert.ok(tooShort.errors.location);

  const valid = validateComplaint({
    title: 'Projector bulb not working in Lab 4',
    category: 'Classroom',
    description: 'The projector turns on but displays no light. Cable was tested with another unit.',
    location: 'Turing Block Lab 4',
    priority: 'Medium',
  });
  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('calculateComplaintStats computes correct totals, open counts, and resolution rate', () => {
  const stats = calculateComplaintStats(sampleComplaints);
  assert.equal(stats.total, 3);
  assert.equal(stats.resolved, 1);
  assert.equal(stats.open, 2);
  assert.equal(stats.submitted, 1);
  assert.equal(stats.inProgress, 1);
  assert.equal(stats.underReview, 0);
  assert.equal(stats.resolutionRate, 33);
  assert.equal(stats.categoryCounts['Internet/Wi-Fi'], 1);
  assert.equal(stats.categoryCounts['Classroom'], 1);
  assert.equal(stats.categoryCounts['Water Supply'], 1);
  assert.equal(stats.priorityCounts['High'], 1);
  assert.equal(stats.priorityCounts['Low'], 1);
  assert.equal(stats.priorityCounts['Urgent'], 1);
});

test('filterComplaints filters by query, category, and status', () => {
  // Query search
  const queryRes = filterComplaints(sampleComplaints, 'Library', 'All', 'All');
  assert.equal(queryRes.length, 1);
  assert.equal(queryRes[0].id, 'CMP-2026-1001');

  // Status search
  const resolvedRes = filterComplaints(sampleComplaints, '', 'Resolved', 'All');
  assert.equal(resolvedRes.length, 1);
  assert.equal(resolvedRes[0].id, 'CMP-2026-1002');

  // Category search
  const waterRes = filterComplaints(sampleComplaints, '', 'All', 'Water Supply');
  assert.equal(waterRes.length, 1);
  assert.equal(waterRes[0].id, 'CMP-2026-1003');

  // Multi-filter no match
  const noMatch = filterComplaints(sampleComplaints, 'XYZ', 'Resolved', 'Classroom');
  assert.equal(noMatch.length, 0);
});
