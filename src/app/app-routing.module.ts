import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompagnesComponent } from './modules/compagnes/compagnes.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'compagnes',
        pathMatch: 'full'
      },
      {
        path: 'compagnes',
        component:CompagnesComponent
      },

    ]

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
