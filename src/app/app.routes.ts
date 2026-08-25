import { Routes, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { MenuComponent } from './component/menu-component/menu-component.component';
import { HomeComponent } from './component/home-component/home-component.component';

import { ListaAtletaComponent } from './component/atleta/lista-atleta/lista-atleta.component';
import { AtletaComponent } from './component/atleta/atleta-component/atleta.component';

import { CadastroCorridasComponent } from './component/corrida/cadastro-corridas/cadastro-corridas.component';
import { CorridasComponent } from './component/corrida/lista-corridas/corridas.component';

import { InscricaoCorridaComponent } from './component/inscricao/inscricao-corrida/inscricao-corrida.component';


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

    { 
        path: "Inscrição",
        component: InscricaoCorridaComponent },

];