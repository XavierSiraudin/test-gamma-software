import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BandEditComponent} from './edit.component';
import {BandService} from '../band.service';
import {BandServiceMock} from '../band.service.mock';
import {provideRouter} from '@angular/router';

describe('BandEditComponent', () => {
    let component: BandEditComponent;
    let fixture: ComponentFixture<BandEditComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BandEditComponent],
            providers: [
                provideRouter([
                    {
                        path: ':id',
                        component: BandEditComponent,
                    }
                ]),
                { provide: BandService, useClass: BandServiceMock },
            ],
        })
            .compileComponents();

        fixture = TestBed.createComponent(BandEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
