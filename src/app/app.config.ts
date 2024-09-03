import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './jwt.interceptor';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PrestamosComponent } from './prestamos/prestamos.component';
import { ColeccionComponent } from './coleccion/coleccion.component';
import { RecursosComponent } from './recursos/recursos.component';
import { GestionUsuariosComponent } from './gestion-usuarios/gestion-usuarios.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
// Define las rutas de la aplicación
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },
  { path: 'prestamos', component: PrestamosComponent, canActivate: [AuthGuard] },
  { path: 'recursos', component: RecursosComponent, canActivate: [AuthGuard] },
  { path: 'gestion-usuarios', component: GestionUsuariosComponent, canActivate: [AuthGuard]},
  { path: 'nav-bar', component: NavBarComponent, canActivate: [AuthGuard]},
  { path: 'coleccion', component: ColeccionComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'login' }
];

