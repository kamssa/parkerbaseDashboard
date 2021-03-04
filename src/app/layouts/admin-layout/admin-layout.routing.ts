import {Routes} from '@angular/router';
import {DashboardComponent} from '../../dashboard/dashboard.component';
import {UserProfileComponent} from '../../user-profile/user-profile.component';
import {ListManagerComponent} from "../../manager/list-manager/list-manager.component";

export const AdminLayoutRoutes: Routes = [

  { path: 'dashboard', component: DashboardComponent },
  { path: 'admin',   component: UserProfileComponent },
  { path: 'manager',   component:  ListManagerComponent}
  ];
