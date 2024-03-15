import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Band} from './band.model';

@Injectable({
    providedIn: 'root'
})
export class BandService {
    constructor(private httpClient: HttpClient) {
    }

    public import(file: File): Observable<void> {
        const formData: FormData = new FormData();
        formData.set('file', file);

        return this.httpClient.post<void>(`/bands/import`, formData);
    }

    public index(): Observable<Band[]> {
        return this.httpClient.get<Band[]>(`/bands`);
    }

    public show(id: number): Observable<Band> {
        return this.httpClient.get<Band>(`/bands/${id}`);
    }

    public replace(id: number, band: Omit<Band, 'id'>): Observable<Band> {
        return this.httpClient.put<Band>(`/bands/${id}`, band);
    }

    public remove(id: number): Observable<void> {
        return this.httpClient.delete<void>(`/bands/${id}`)
    }
}
