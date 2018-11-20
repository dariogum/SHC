import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralViewComponent } from './general-view/general-view.component';
import { ScheduleFormComponent } from './schedule-form/schedule-form.component';

const routes: Routes = [
  { path: '', component: GeneralViewComponent },
  { path: ':id', component: ScheduleFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulesRoutingModule { }
