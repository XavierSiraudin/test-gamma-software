import {Component, OnDestroy, OnInit} from '@angular/core';
import {Band} from '../band.model';
import {BandService} from '../band.service';
import {delay, map, Subscription, switchMap} from 'rxjs';
import {ActivatedRoute, ParamMap, Router, RouterModule} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
    selector: 'app-edit',
    standalone: true,
    imports: [ReactiveFormsModule, RouterModule],
    templateUrl: './edit.component.html',
    styleUrl: './edit.component.scss'
})
export class BandEditComponent implements OnInit, OnDestroy {
    public isLoading: boolean = true;

    public form?: FormGroup;

    public band?: Band;

    public paramMapSubscription?: Subscription;

    constructor(
        private bandService: BandService,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private router: Router
    ) {
    }

    public ngOnInit(): void {
        // Reset the data
        delete this.band;

        this.getBand();
    }

    public ngOnDestroy(): void {
        this.paramMapSubscription?.unsubscribe();
    }

    /**
     * When the form is submitted, send the API call to update the resource.
     */
    public onFormSubmitted(): void {
        this.isLoading = true;

        this.bandService
            .replace(this.band?.id as number, this.form?.value)
            .subscribe({
                next: (): void => {
                    this.router.navigate(['/']);
                },
                error: (): void => {
                    this.isLoading = false;
                }
            })
    }

    /**
     * Gets the ID of the band to retrieve from the route params, fetches it, and stop the loading when it's ready.
     *
     * @private
     */
    private getBand(): void {
        this.paramMapSubscription = this.activatedRoute
            .paramMap
            .pipe(
                // Isolate the ID
                map((paramMap: ParamMap) => Number(paramMap.get('id'))),
                // Use it to fetch the data
                switchMap((id: number) => this.bandService.show(id)),
                // Delay by a quarter of a second to show off the spinner
                delay(250)
            )
            .subscribe({
                next: (band: Band): void => {
                    this.band = band;
                    this.initForm(band);
                    this.isLoading = false;
                },
                error: (): void => {
                    this.router.navigate(['/'])
                }
            });
    }

    /**
     * Initializes the form.
     *
     * @param band the data retrieved from the API.
     * @private
     */
    private initForm(band: Band): void {
        this.form = this.formBuilder.group({
            name: this.formBuilder.control(band.name, [Validators.required]),
            country: this.formBuilder.control(band.country),
            city: this.formBuilder.control(band.city),
            startingYear: this.formBuilder.control(band.startingYear, [Validators.min(1900), Validators.max(2024)]),
            separationYear: this.formBuilder.control(band.separationYear, [Validators.min(1900), Validators.max(2024)]),
            founders: this.formBuilder.control(band.founders),
            membersCount: this.formBuilder.control(band.membersCount, [Validators.min(1)]),
            musicalStyle: this.formBuilder.control(band.musicalStyle),
            description: this.formBuilder.control(band.description),
        });
    }
}
