import {FormControl} from '@angular/forms';

export interface BandForm
{
    name: FormControl<string>;
    country: FormControl<string|null>;
    city: FormControl<string|null>;
    startingYear: FormControl<number|null>;
    separationYear: FormControl<number|null>;
    founders: FormControl<string|null>;
    membersCount: FormControl<number|null>;
    musicalStyle: FormControl<string|null>;
    description: FormControl<string|null>;
}
