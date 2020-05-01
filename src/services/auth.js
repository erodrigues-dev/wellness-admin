export function signIn() {
  return new Promise((resolve) => {
    setTimeout(
      resolve({
        token: 'asldkj03i09dfsdlfkjlaskd',
        user: {
          name: 'Elton Rodrigues',
          email: 'erodrigues.dev@gmail.com',
          type: 'customer',
        },
      }),
      1000
    );
  });
}
