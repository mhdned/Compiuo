// require dependencies, packages and libraries
const path = require('path');
const dotenv = require('dotenv');

// status of environment
const envList = ['dev', 'prod'];

class ConfigENV {
  constructor(environemt_setup) {
    if (envList.includes(environemt_setup)) {
      this.configuration(environemt_setup);
      this.setValues();
    } else {
      throw new Error('The configuration setup failed.');
    }

    // configuration environment variable
    process.env.MAIN_PATH = path.dirname(__dirname);
    console.log(process.env.MAIN_PATH);
    console.log(process.env.UPLOAD_PATH);
  }

  configuration(environment) {
    switch (environment) {
      case 'dev':
        dotenv.config({ path: './dev.env' });
        break;

      case 'prod':
        dotenv.config({ path: './prod.env' });
        break;

      default:
        dotenv.config({ path: '../.env' });

        break;
    }
  }

  setValues() {
    this.port = process.env.PORT;
    this.env = process.env.ENV;
  }
}

const ConfEnv = new ConfigENV(process.env.ENV);

module.exports = { ConfEnv };
