'use strict';

process.env.NODE_ENV = 'production';

process.on('unhandledRejection', err => {
  throw err;
});

const chalk = require('chalk');
const config = require('../webpack.config');
const fs = require('fs-extra');
const webpack = require('webpack');

build();

// Create the production build and print the deployment instructions.
function build() {
    console.log('Creating an optimized production build...');

    let compiler = webpack(config);
    return new Promise( (resolve, reject) => {
        compiler.run( (err, stats) => {
            if (err) {
                return reject(err);
            }

            if ( process.env.CI && (typeof process.env.CI !== 'string' || process.env.CI.toLowerCase() !== 'false') ) {
                console.log( chalk.yellow('\nTreating warnings as errors because process.env.CI = true.\n' + 'Most CI servers set it automatically.\n') );
                return reject( new Error("An error occured during build the process.") );
            }

            return resolve({stats});

        });
    });
}
