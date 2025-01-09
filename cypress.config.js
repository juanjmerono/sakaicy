const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    //baseUrl: "http://host.docker.internal:8080",   // Base URL para tus pruebas
    baseUrl: "https://trunk-mysql8.nightly.sakaiproject.org",   // Base URL para tus pruebas
    projectId: "sakaitest",              // ID del proyecto en el Dashboard de Cypress
    video: true,                        // Habilita la grabación de videos de las pruebas
    supportFile: 'cypress/support/commands.js',

    setupNodeEvents(on, config) {
      // Aquí puedes configurar eventos o plugins si es necesario
    },
  },
});
