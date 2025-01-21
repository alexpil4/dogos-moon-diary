import { faker } from '@faker-js/faker';
import { http, HttpResponse } from 'msw';
import { db } from './db';
import { Observation } from '../types';
import { pickBy } from 'lodash';

export const handlers = [
  http.get('/api/moonphase', () => {
    return HttpResponse.json({
      phase: faker.helpers.arrayElement([
        'New Moon',
        'Waxing crescent',
        'First quarter',
        'Waxing gibbous',
        'Full Moon',
        'Waning gibbous',
        'Last quarter',
        'Waning crescent',
      ]),
      illumination: faker.number.float({ min: 0, max: 100, fractionDigits: 3 }),
    });
  }),
  http.get('/api/observations/:id', ({ params }) => {
    const { id } = params;

    if (typeof id === 'string') {
      const obs = db.observation.findFirst({
        where: { id: { equals: id } },
      });
      if (obs) {
        return HttpResponse.json(obs, { status: 200 });
      }
    }
    return HttpResponse.json(
      { error: 'No observation found' },
      { status: 404 },
    );
  }),
  http.post('/api/observations', async ({ request }) => {
    const data = (await request.json()) as Partial<Omit<Observation, 'id'>>;

    if (!data) {
      return HttpResponse.json(
        { error: 'Invalid observation data' },
        { status: 400 },
      );
    }

    const newObs = {
      phase: data.phase,
      illumination: data.illumination,
      notes: data.notes,
      date: typeof data.date === 'string' ? new Date(data.date) : undefined,
    };

    const obs = db.observation.create(
      pickBy(newObs, (val) => val !== undefined),
    );
    return HttpResponse.json(obs, { status: 201 });
  }),
  http.put('/api/observations/:id', async ({ params, request }) => {
    const { id } = params;
    const data = (await request.json()) as Partial<Omit<Observation, 'id'>>;

    if (typeof id !== 'string') {
      return HttpResponse.json(
        { error: 'No observation found' },
        { status: 404 },
      );
    }
    if (!data) {
      return HttpResponse.json(
        { error: 'Invalid observation data' },
        { status: 400 },
      );
    }

    const update = {
      phase: data.phase,
      illumination: data.illumination,
      notes: data.notes,
      date: typeof data.date === 'string' ? new Date(data.date) : undefined,
    };

    const obs = db.observation.update({
      where: {
        id: {
          equals: id,
        },
      },
      data: pickBy(update, (val, key) => val !== undefined && key !== 'id'),
    });
    return HttpResponse.json(obs, { status: 200 });
  }),
  http.delete('/api/observations/:id', ({ params }) => {
    const { id } = params;

    if (typeof id === 'string') {
      const deletedUser = db.observation.delete({
        where: { id: { equals: id } },
      });
      if (deletedUser) {
        return new HttpResponse(null, { status: 204 });
      }
    }

    return HttpResponse.json(
      { error: 'No observation found' },
      { status: 404 },
    );
  }),
  http.get('/api/observations', ({ request }) => {
    const url = new URL(request.url);
    const qs = url.searchParams;
    const rawSkip = qs.get('skip');
    const rawTake = qs.get('take');

    const skip = rawSkip == null ? undefined : parseInt(rawSkip, 10);
    const take = rawTake == null ? undefined : parseInt(rawTake, 10);

    const obss = db.observation.findMany({
      orderBy: {
        date: 'desc',
      },
      take: take,
      skip: skip,
    });

    return HttpResponse.json({
      observations: obss,
      total: db.observation.count(),
    });
  }),
];
