import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BandListComponent} from './list.component';
import {BandService} from '../band.service';
import {BandServiceMock} from '../band.service.mock';

describe('BandListComponent', () => {
    let component: BandListComponent;
    let fixture: ComponentFixture<BandListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [BandListComponent],
            providers: [
                { provide: BandService, useClass: BandServiceMock },
            ],
        })
            .compileComponents();

        fixture = TestBed.createComponent(BandListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
