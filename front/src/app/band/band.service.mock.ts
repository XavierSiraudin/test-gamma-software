import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {Band} from './band.model';
import {BAND_MOCK} from './band.mock';

@Injectable({
    providedIn: 'root'
})
export class BandServiceMock {

    /* eslint-disable @typescript-eslint/no-unused-vars */
    public import(file: File): Observable<void> {
        return of(null as unknown as void);
    }

    public index(): Observable<Band[]> {
        return of([BAND_MOCK]);
    }

    /* eslint-disable @typescript-eslint/no-unused-vars */
    public show(id: number): Observable<Band> {
        return of(BAND_MOCK)
    }

    public replace(id: number, band: Omit<Band, 'id'>): Observable<Band> {
        return of({id, ...band});
    }

    /* eslint-disable @typescript-eslint/no-unused-vars */
    public remove(id: number): Observable<void> {
        return of(null as unknown as void);
    }
}
