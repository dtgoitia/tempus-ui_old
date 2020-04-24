import { entryType, flattenPlan } from "./Plan";

const SAMPLE_RAW_PLAN_DATA = [
  {
    id: "1",
    loopIndex: 0,
    rounds: 2,
    description: "description of the Loop 1",
    goals: [
      {
        id: "1",
        goalIndex: 0,
        exercise: {
          id: "1",
          name: "exercise name 1",
          description: "exercise description 1",
          exerciseType: "WORK",
        },
        duration: 10,
        repetitions: 3,
        pause: false,
      },
      {
        id: "2",
        goalIndex: 1,
        exercise: {
          id: "2",
          name: "exercise name 2",
          description: "exercise description 2",
          exerciseType: "WORK",
        },
        duration: 10,
        repetitions: 3,
        pause: false,
      },
      {
        id: "3",
        goalIndex: 2,
        exercise: {
          id: "3",
          name: "exercise name 3",
          description: "exercise description 3",
          exerciseType: "WORK",
        },
        duration: 10,
        repetitions: 3,
        pause: false,
      },
    ],
  },
  {
    id: "2",
    loopIndex: 1,
    rounds: 2,
    description: "description of the Loop 2",
    goals: [
      {
        id: "4",
        goalIndex: 0,
        exercise: {
          id: "7",
          name: "rest exercise name",
          description: "rest exercise description",
          exerciseType: "REST",
        },
        duration: 10,
        repetitions: 3,
        pause: true,
      },
    ],
  },
  {
    id: "3",
    loopIndex: 2,
    rounds: 2,
    description: "description of the Loop 3",
    goals: [
      {
        id: "5",
        goalIndex: 1,
        exercise: {
          id: "12",
          name: "prep exercise name",
          description: "prep exercise description",
          exerciseType: "PREP",
        },
        duration: 10,
        repetitions: 0,
        pause: false,
      },
    ],
  },
];

describe("Plan", () => {
  describe("flattenPlan", () => {
    it("flattens the raw plan structure into UI valuable data", () => {
      const actualResult = flattenPlan(SAMPLE_RAW_PLAN_DATA);
      const expectedResult = [
        {
          index: 0,
          type: entryType.LOOP,
          rounds: 2,
          entries: [
            {
              exerciseId: "1",
              index: 0,
              type: entryType.WORK,
              name: "exercise name 1",
              description: "exercise description 1",
              duration: 10,
              repetitions: 3,
              pause: false,
            },
            {
              exerciseId: "2",
              index: 1,
              type: entryType.WORK,
              name: "exercise name 2",
              description: "exercise description 2",
              duration: 10,
              repetitions: 3,
              pause: false,
            },
            {
              exerciseId: "3",
              index: 2,
              type: entryType.WORK,
              name: "exercise name 3",
              description: "exercise description 3",
              duration: 10,
              repetitions: 3,
              pause: false,
            }
          ]
        },
        {
          index: 1,
          type: entryType.REST,
          exerciseId: "7",
          name: "rest exercise name",
          description: "rest exercise description",
          duration: 10,
          repetitions: 3,
          pause: true,
        },
        {
          index: 2,
          type: entryType.PREP,
          exerciseId: "12",
          name: "prep exercise name",
          description: "prep exercise description",
          duration: 10,
          repetitions: 0,
          pause: false,
        }
      ];
      expect(actualResult).toEqual(expectedResult);
    });
  });
});
