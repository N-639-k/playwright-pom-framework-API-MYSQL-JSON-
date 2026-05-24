module.exports = {

  default: {

    require: [
      'stepDefinitions/*.ts',
      'hooks/*.ts'
    ],

    format: [
      'progress-bar',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json'
    ],

    paths: [
      'featureFiles/*.feature'
    ],

    requireModule: ['ts-node/register']
  }
};