import { dropTypename, TYPE_NAME } from "./utils";

describe('Utils', () => {
  describe('dropTypename', () => {
    it(`should drop the ${TYPE_NAME} in simple objects`, () => {
      const result = dropTypename({ a: 1, b: 2, [TYPE_NAME]: 'blah' });
      const expected = { a: 1, b: 2 };
      expect(result).toEqual(expected);
    });
    it('should handle empty objects', () => {
      const result = dropTypename({});
      const expected = {};
      expect(result).toEqual(expected);
    })
    it(`should handle objects where the only property is ${TYPE_NAME}`, () => {
      const result = dropTypename({
        [TYPE_NAME]: 'blah',
      });
      const expected = {};
      expect(result).toEqual(expected);
    })
    it(`should handle ${TYPE_NAME} within arrays`, () => {
      const result = dropTypename({
        a: 1,
        b: 2,
        c: ['foo', TYPE_NAME, 'bar'],
      });
      const expected = {
        a: 1,
        b: 2,
        c: ['foo', 'bar'],
      };
      expect(result).toEqual(expected);
    })
    it(`should drop all ${TYPE_NAME} at all levels`, () => {
      const result = dropTypename({
        a: 1,
        b: 2,
        c: [
          'foo',
          {
            d: 3,
            e: 4,
            [TYPE_NAME]: 'foo',  // key in object in array
          },
          TYPE_NAME,  // <-- in array
          'bar',
        ],
        __typename: 'blah', // <-- key in object
      });
      const expected = {
        a: 1,
        b: 2,
        c: [
          'foo',
          {
            d: 3,
            e: 4,
          },
          'bar',
        ],
      };
      expect(result).toEqual(expected);
    });
  });
});
