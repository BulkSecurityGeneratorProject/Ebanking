import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Operation } from './operation.model';
import { OperationPopupService } from './operation-popup.service';
import { OperationService } from './operation.service';
import { OperationType, OperationTypeService } from '../operation-type';
import { PriseEnCharge, PriseEnChargeService } from '../prise-en-charge';
import { Compte, CompteService } from '../compte';

@Component({
    selector: 'jhi-operation-dialog',
    templateUrl: './operation-dialog.component.html'
})
export class OperationDialogComponent implements OnInit {

    operation: Operation;
    isSaving: boolean;

    operationtypes: OperationType[];

    priseencharges: PriseEnCharge[];

    comptes: Compte[];
    dateOperationDp: any;
    dateAcceptationDp: any;
    dateExecutionDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private operationService: OperationService,
        private operationTypeService: OperationTypeService,
        private priseEnChargeService: PriseEnChargeService,
        private compteService: CompteService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.operationTypeService.query()
            .subscribe((res: HttpResponse<OperationType[]>) => { this.operationtypes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.priseEnChargeService.query()
            .subscribe((res: HttpResponse<PriseEnCharge[]>) => { this.priseencharges = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.compteService.query()
            .subscribe((res: HttpResponse<Compte[]>) => { this.comptes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.operation.id !== undefined) {
            this.subscribeToSaveResponse(
                this.operationService.update(this.operation));
        } else {
            this.subscribeToSaveResponse(
                this.operationService.create(this.operation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Operation>>) {
        result.subscribe((res: HttpResponse<Operation>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Operation) {
        this.eventManager.broadcast({ name: 'operationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackOperationTypeById(index: number, item: OperationType) {
        return item.id;
    }

    trackPriseEnChargeById(index: number, item: PriseEnCharge) {
        return item.id;
    }

    trackCompteById(index: number, item: Compte) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-operation-popup',
    template: ''
})
export class OperationPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private operationPopupService: OperationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.operationPopupService
                    .open(OperationDialogComponent as Component, params['id']);
            } else {
                this.operationPopupService
                    .open(OperationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
