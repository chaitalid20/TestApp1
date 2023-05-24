import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  
    // { path:'gasPrice', loadChildren:() => import('./components/GasPrice/gas-price.module').then(m =>m.GasPriceModule)},
    // { path: 'plant', loadChildren: () => import('./components/Plant/plant.module').then(m => m.PlantModule) },
    // { path: 'user', loadChildren: () => import('./components/UserManagement/user-management.module').then(m => m.UserManagementModule) },
    
    
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
