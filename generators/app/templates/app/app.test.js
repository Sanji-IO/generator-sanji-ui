// This file is an entry point for angular tests
// Avoids some weird issues when using webpack + angular.

var testsContext = require.context('./component', true, /\.spec\.js$/);
testsContext.keys().forEach(testsContext);
