// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  portfolioDataUrl: '/assets/data/portfolio-data.json',
  firebaseConfig: {
    apiKey: "AIzaSyARiEkRPkyJokcAObM9t5oc5z_69rUKUVg",
    authDomain: "portfolio-website-a09d0.firebaseapp.com",
    projectId: "portfolio-website-a09d0",
    storageBucket: "portfolio-website-a09d0.firebasestorage.app",
    messagingSenderId: "902960792456",
    appId: "1:902960792456:web:09c27a63cca9afc7d0303d"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.