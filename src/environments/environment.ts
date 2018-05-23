// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBEi34tJ32tvY_OZgTuwZmmSbwuCdqnqvM',
    authDomain: 'gt-course-surveys-dev.firebaseapp.com',
    databaseURL: 'https://gt-course-surveys-dev.firebaseio.com',
    projectId: 'gt-course-surveys-dev',
    storageBucket: 'gt-course-surveys-dev.appspot.com',
    messagingSenderId: '1029912675292',
  },
};
