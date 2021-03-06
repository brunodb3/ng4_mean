/**
 *  app.routing.ts
 *    - Defines the app's routes
 *  
 ******************************************************************************/

/* Importing modules */
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Importing custom components */
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { EditarUsuarioComponent } from './pages/editar-usuario/editar-usuario.component';
import { CadastrarUsuarioComponent } from './pages/cadastrar-usuario/cadastrar-usuario.component';

/* Importing custom providers */
import { AuthGuard } from './services/auth-guard.service';
import { AccessGuard } from './services/access-guard.service';

/* Defining the app's routes */
const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '404', component: NotFoundComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'cadastrar-usuario', component: CadastrarUsuarioComponent, canActivate: [AccessGuard] },
  { path: 'editar-usuario/:userEmail', component: EditarUsuarioComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/404' }
];

/* Exporting the module (with all the providers), defining the routes as root */
export const CustomRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
