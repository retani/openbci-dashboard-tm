/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  'smoothie': 'vendor/smoothie/smoothie.js',
  'chartjs': 'vendor/chart.js/dist/Chart.bundle.js',
  'ng2-charts': 'vendor/ng2-charts/bundles/ng2-charts.js',
  //'socket.io-client': 'vendor/socket.io-client/socket.io.js',
  'socket.io-client': 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.3/socket.io.js',
  'chroma-js': 'vendor/chroma-js/chroma.js',
  'plotly': 'vendor/plotly.js/dist/plotly.js',
  'brainbrowser': 'vendor/brainbrowser/build/brainbrowser-2.3.0/brainbrowser.surface-viewer.min.js'
};  

/** User packages configuration. */
const packages: any = {
 
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/http',
  '@angular/router',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',

  // Thirdparty barrels.
  'rxjs',

  // App specific barrels.
  'app',
  'app/shared',
  'app/frequency',
  'app/time-series',
  'app/nav',
  'app/frequency-bands',
  'app/frequency-band',
  'app/topo',
  'app/filters',
  'app/motion',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
