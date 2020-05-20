// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiURL: 'http://192.168.1.152:58721/api',
  firebase: {
    apiKey: "AIzaSyBcRVxSsUP_DWhqIrjTclKp9EDVWI5C9WY",
    authDomain: "ezexpenses-d96fc.firebaseapp.com",
    databaseURL: "https://ezexpenses-d96fc.firebaseio.com",
    projectId: "ezexpenses-d96fc",
    storageBucket: "ezexpenses-d96fc.appspot.com",
    messagingSenderId: "246095721697",
    appId: "1:246095721697:web:7c5b9f575412751f9733a0",
    measurementId: "G-L0MVYQ5401"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
