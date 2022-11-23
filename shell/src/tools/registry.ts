import { loadRemoteModule } from '@angular-architects/module-federation';

export const registry = {
  mfe1: () =>
    loadRemoteModule({
      type: 'script',
      remoteName: 'mfe1',
      remoteEntry: 'http://localhost:4201/remoteEntry.js',
      exposedModule: './Component',
    }),
  mfe2: () =>
    loadRemoteModule({
      type: 'script',
      remoteEntry: 'http://localhost:4202/remoteEntry.js',
      remoteName: 'mfe2',
      exposedModule: './Component',
    }),
};

export type KeyRegistry = 'mfe1' | 'mfe2';
