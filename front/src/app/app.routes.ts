import {Routes} from '@angular/router';
import {BandListComponent} from './band/list/list.component';
import {BandEditComponent} from './band/edit/edit.component';

export const routes: Routes = [
    {
        path: '',
        component: BandListComponent,
    },
    {
        path: ':id',
        component: BandEditComponent,
    }
];
