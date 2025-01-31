/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node', // ou 'jsdom' para projetos front-end
  testMatch: ['**/*.test.ts'], // Opcional: garante que apenas arquivos .test.ts sejam testados
};
