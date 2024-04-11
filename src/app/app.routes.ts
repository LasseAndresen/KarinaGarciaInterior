import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: () => import('./pages/home-page/homePageModule').then(m => m.HomePageModule)
    },
    {
        path: 'contact',
        loadChildren: () => import('./pages/contact-page/contactPageModule').then(m => m.ContactPageModule)
    }
];
