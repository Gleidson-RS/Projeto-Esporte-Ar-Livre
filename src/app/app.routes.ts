import { Routes, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { MenuComponent } from './component/menu-component/menu-component.component';

import { AtletaComponent } from './component/atleta-component/atleta.component';
import { HomeComponent } from './component/home-component/home-component.component';
import { CadastroCorridasComponent } from './component/cadastro-corridas/cadastro-corridas.component';
import { CorridasComponent } from './component/lista-corridas/corridas.component';
import { ListaAtletaComponent } from './component/lista-atleta/lista-atleta.component';

export const routes: Routes = [

    {
        path:"",
        redirectTo: "Home",
        pathMatch: "full",

    },

    { 
        path: "Home",
        component: HomeComponent },

    { 
        path: "Cadastro-Atleta",
        component: AtletaComponent },
        
    { 
        path: "Cadastro-Atleta/:id",
        component: AtletaComponent },
        
    { 
        path: "Cadastro-Corrida",
        component: CadastroCorridasComponent },

    { 
        path: "Cadastro-Corrida/:id",
        component: CadastroCorridasComponent },
        
    { 
        path: "Corridas",
        component: CorridasComponent
    },

    { 
         path: "Atletas",
        component: ListaAtletaComponent },

];