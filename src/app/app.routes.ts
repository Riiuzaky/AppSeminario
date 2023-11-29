import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './shared/header/header.component';
import { RecursoComponent } from './pages/recurso/recurso.component';

export const routes: Routes = [

    {
        path: "",
        component: LoginComponent
    },
    {
        path: "Login",
        component: LoginComponent
    },
    {
        path: "header",
        component: HeaderComponent
    },
    {
        path: "recurso/:id",
        component: RecursoComponent
    },
    {
        path: "home",
        component: HomeComponent
    }



];
