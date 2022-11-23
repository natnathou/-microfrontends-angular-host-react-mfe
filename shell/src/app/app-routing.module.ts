import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WrapperComponent } from './components/wrapper.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: 'mfe1',
    component: WrapperComponent,
    data: { importName: 'mfe1', elementName: 'mfe1-element' },
  },
  {
    path: 'mfe2',
    component: WrapperComponent,
    data: { importName: 'mfe2', elementName: 'mfe2-element', isReact: true },
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
