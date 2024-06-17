/* eslint-disable @typescript-eslint/unbound-method */
import { factory, manyOf, primaryKey } from "@mswjs/data";
import { faker } from "@faker-js/faker";

export const db = factory({
  category: {
    id: primaryKey(faker.string.uuid),
    name: faker.commerce.department,
  },
  product: {
    id: primaryKey(faker.string.uuid),
    description: faker.commerce.productDescription,
    category: faker.string.uuid,
    price: faker.number.float,
  },
  order: {
    id: primaryKey(faker.string.uuid),
    customerId: faker.string.uuid,
    total: faker.number.float,
    items: manyOf("orderItem"),
  },
  orderItem: {
    productId: primaryKey(faker.string.uuid),
    quantity: faker.number.int,
    unitPrice: faker.number.float,
    total: faker.number.float,
  },
  customer: {
    id: primaryKey(faker.string.uuid),
    name: faker.person.firstName,
    since: faker.date.past().toISOString,
    revenue: faker.finance.amount,
  },
});
