export const fakeAuth = (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve("loggedtoken"), 500);
  });
};
