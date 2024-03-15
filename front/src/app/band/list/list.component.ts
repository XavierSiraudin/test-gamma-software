import {Component, OnInit} from '@angular/core';
import {BandService} from '../band.service';
import {Band} from '../band.model';
import {delay} from 'rxjs';
import {CommonModule} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
    selector: 'app-list',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './list.component.html',
    styleUrl: './list.component.scss'
})
export class BandListComponent implements OnInit {
    public isLoading: boolean = true;

    public bands: Band[] = [];

    constructor(private bandService: BandService) {
    }

    public ngOnInit(): void {
        this.getBands();
    }

    public onFileChanged(event: Event): void {
        const file: File = (event.target as unknown as { files: File[] }).files[0];

        this.isLoading = true;

        this.bandService
            .import(file)
            .subscribe({
                next: () => this.getBands(),
                error: () => this.isLoading = false
            })
    }

    public onRemoveBandClicked(id: number): void {
        this.isLoading = true;

        this.bandService
            .remove(id)
            .subscribe({
                next: () => this.getBands(),
                error: () => this.isLoading = false
            })
    }

    /**
     * Fetches all the bands, and stops the loading when it's ready.
     *
     * @private
     */
    private getBands(): void {
        this.bandService
            .index()
            .pipe(
                // Delay by a quarter of a second to show off the spinner
                delay(250)
            )
            .subscribe({
                next: (bands: Band[]): void => {
                    this.bands = bands;
                    this.isLoading = false;
                },
                error: (): void => {
                    this.isLoading = false;
                }
            });
    }
}
