import { Routes, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MenuComponent } from './component/menu-component/menu-component.component';
import { AtletaComponent } from './component/atleta/atleta.component';
import { HomeComponent } from './component/home-component/home-component.component';

export const routes: Routes = [

    {
        path:"",
        redirectTo: "/Home",
        pathMatch: "full",

    },

    { 
        path: "/Home",
        component: HomeComponent },

    { 
        path: "/Cadastro-Atleta",
        component: AtletaComponent },
    

];