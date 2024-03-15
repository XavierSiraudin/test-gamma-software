import {TestBed} from '@angular/core/testing';

import {BandService} from './band.service';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideHttpClient} from '@angular/common/http';

describe('BandService', () => {
    let service: BandService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideHttpClient(), provideHttpClientTesting()]
        });
        service = TestBed.inject(BandService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
