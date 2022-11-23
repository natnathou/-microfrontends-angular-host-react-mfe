import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}
declare const require: any;
const ngVersion = require('../package.json').dependencies['@angular/core'];
if(!(window as any).platform){
  (window as any).platform = {}
}
let platform = (window as any).platform[ngVersion];

if (!platform) {
  platform = platformBrowserDynamic();
  (window as any).platform[ngVersion] = platform;
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err: any) => console.error(err));
