const createMock = (r, s, re, w) => {
  return {
    routine: r,
    sets: s,
    reps: re,
    weight: w,
  };
};

const mockData = {
  1: [
    {
      routine: 'Curl',
      sets: 4,
      reps: 12,
      weight: 10,
    },
    {
      routine: 'Pull Up',
      sets: 4,
      reps: 12,
      weight: 10,
    },
  ],
  2: [
    {
      routine: 'PullDown',
      sets: 2,
      reps: 10,
      weight: 10,
    },
  ],
  3: [createMock('Test 1', 2, 20, 15)],
  4: [
    createMock('Test 1', 2, 20, 15),
    createMock('Test 3', 2, 20, 15),
    createMock('Test 2', 2, 20, 15),
  ],
};
