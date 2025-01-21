import { faker } from "@faker-js/faker";
import { factory, primaryKey } from "@mswjs/data";

faker.seed(123456);

export const db = factory({
  observation: {
    id: primaryKey(() => faker.string.uuid()),
    date: () => faker.date.past(),
    phase: () =>
      faker.helpers.arrayElement([
        "New Moon",
        "Waxing crescent",
        "First quarter",
        "Waxing gibbous",
        "Full Moon",
        "Waning gibbous",
        "Last quarter",
        "Waning crescent",
      ]),
    illumination: () =>
      faker.number.float({ min: 0, max: 100, fractionDigits: 3 }),
    notes: String,
  },
});

export function seedDB() {
  for (let i = 0; i < 42; i += 1) {
    db.observation.create({});
  }
}
