/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { EbankingTestModule } from '../../../test.module';
import { TypeCarteDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/type-carte/type-carte-delete-dialog.component';
import { TypeCarteService } from '../../../../../../main/webapp/app/entities/type-carte/type-carte.service';

describe('Component Tests', () => {

    describe('TypeCarte Management Delete Component', () => {
        let comp: TypeCarteDeleteDialogComponent;
        let fixture: ComponentFixture<TypeCarteDeleteDialogComponent>;
        let service: TypeCarteService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [EbankingTestModule],
                declarations: [TypeCarteDeleteDialogComponent],
                providers: [
                    TypeCarteService
                ]
            })
            .overrideTemplate(TypeCarteDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TypeCarteDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TypeCarteService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
