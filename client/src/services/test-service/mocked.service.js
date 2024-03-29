const mockedService = {
  get: jest.fn(() => Promise.resolve({ data: dummyGroups })),
  post: jest.fn(() => Promise.resolve({ data: "mocked data" })),
  put: jest.fn(() => Promise.resolve({ data: "mocked data" })),
  delete: jest.fn(() => Promise.resolve({ data: "mocked data" })),
};
