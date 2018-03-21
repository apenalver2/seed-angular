import { Component, OnInit } from '@angular/core';
import { I18nService } from 'systelab-translate/lib/i18n.service';
import { PatientService } from '../../../common/api/patient.service';
import { Patient } from '../../../common/model/patient';
import { Address } from '../../../common/model/address';
import { DialogRef, ModalComponent, SystelabModalContext } from 'systelab-components/widgets/modal';

export class PatientDialogParameters extends SystelabModalContext {
	public patientId;
	public width = 700;
	public height = 450;
}

@Component({
	selector:    'patient-dialog',
	templateUrl: 'patient-dialog.component.html',
})
export class PatientDialog implements ModalComponent<PatientDialogParameters>, OnInit {

	public parameters: PatientDialogParameters;

	public check2 = true;
	public title = '';
	public humanReadableAction = '';

	public patient = new Patient();

	constructor(public dialog: DialogRef<PatientDialogParameters>, protected i18NService: I18nService,
	            protected patientService: PatientService) {
		this.parameters = dialog.context;
		if (this.parameters.patientId) {
			this.humanReadableAction = 'Update';
			this.title = 'Update patient';
		} else {
			this.humanReadableAction = 'Create';
			this.title = 'Create patient';
		}
	}

	public static getParameters(): PatientDialogParameters {
		return new PatientDialogParameters();
	}

	public ngOnInit() {
		if (this.parameters.patientId) {

			this.patientService.getPatient(this.parameters.patientId)
				.subscribe(
					(response) => {
						if (!response.address) {
							response.address = new Address();
						}
						this.patient = response;
					}
				);
		}
	}

	public close(): void {
		this.dialog.close(false);
	}

	public performAction() {
		if (this.parameters.patientId) {
			this.updatePatient(this.patient);
		} else {
			this.createPatient(this.patient);
		}
	}

	private createPatient(patient: Patient) {
		this.patientService.createPatient(patient)
			.subscribe(
				(result) => {
					this.dialog.close(true);
				},
				(error) => console.log('Error')
			);
	}

	private updatePatient(patient: Patient) {
		this.patientService.updatePatient(patient.id, patient)
			.subscribe(
				(result) => {
					this.dialog.close(true);
				},
				(error) => console.log('Error')
			);
	}
}
