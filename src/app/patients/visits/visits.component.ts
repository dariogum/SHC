import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NgForm } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';

import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { environment } from './../../../environments/environment';
import { ImageDialogComponent } from './image-dialog.component';
import { Patient } from './../../classes/patient';
import { PatientService } from './../patient.service';
import { Visit } from './../../classes/visit';

const APIVERSIONURL: string = environment.url + '/v1';

@Component({
	selector: 'app-visits',
	templateUrl: './visits.component.html',
	styleUrls: ['./visits.component.css']
})
export class VisitsComponent implements OnInit {

	biggerFont: boolean = false;
	files: FileList = null;
	formClass: string = 'wide';
	@Input() patient: Patient;
	today: Date = new Date();
	uploadingFiles: boolean = false;
	visitInForm: Visit = new Visit();
	visitFormOpen: boolean = false;

	@ViewChild('visitForm') public visitForm: NgForm;

	constructor(
		private breakpointObserver: BreakpointObserver,
		public dialog: MatDialog,
		private patientService: PatientService,
		public snackBar: MatSnackBar,
	) { }

	ngOnInit() {
		this.breakpointObserver.observe([
			Breakpoints.HandsetPortrait
		]).subscribe(result => {
			if (result.matches) {
				this.formClass = 'handset';
			}
		});

		this.breakpointObserver.observe([
			Breakpoints.HandsetLandscape,
			Breakpoints.TabletPortrait,
		]).subscribe(result => {
			if (result.matches) {
				this.formClass = 'tablet';
			}
		});

		this.breakpointObserver.observe([
			Breakpoints.TabletLandscape,
			Breakpoints.WebPortrait,
			Breakpoints.WebLandscape,
		]).subscribe(result => {
			if (result.matches) {
				this.formClass = 'wide';
			}
		});
	}

	onVisitSubmit() {
		if (this.visitInForm.id === undefined) {
			this.patientService.addVisit(this.visitInForm, this.patient.id).subscribe(visit => {
				this.visitInForm.id = visit.id;
				if (this.files && this.files.length) {
					this.uploadFiles(this.visitInForm, true);
				} else {
					this.addVisitToPatient(this.visitInForm);
					this.visitFormOpen = false;
				}
			});
		}
	}

	updateVisit(event) {
		if (this.visitInForm.id && this.visitForm.form.valid) {
			let controlName: string;
			if (event.value !== undefined && event.source) {
				controlName = event.source.ngControl.name;
			} else if (event.value !== undefined) {
				controlName = event.targetElement.name;
			} else {
				controlName = event.target.name;
			}
			let isVisitControl = this.visitForm.controls[controlName] && !this.visitForm.controls[controlName].pristine;
			if (isVisitControl) {
				this.patientService.updateVisit(this.visitInForm, this.patient.id).subscribe();
			}
		}
	}

	deleteVisit(visit) {
		this.patientService.deleteVisit(visit.id)
			.subscribe(result => {
				if (result) {
					let index = this.patient.visits.indexOf(visit);
					if (index > -1) {
						this.patient.visits.splice(index, 1);
					}
					if (visit === this.visitInForm) {
						this.visitInFormReset();
					}
					let snackBarRef = this.snackBar.open('La visita fue eliminada correctamente', 'OK', {
						duration: 2500,
					});
				}
			});
	}

	visitInFormReset() {
		/** This tasks order is important **/
		this.visitInForm = new Visit();
		this.visitForm.reset();
		this.files = null;
		this.visitInForm.date = this.today;
	}


	addFileToVisit(visit: Visit, files: any) {
		for (let i = 0; i < files.length; i++) {
			visit.files.unshift({ id: files[i].data.id, url: APIVERSIONURL + files[i].links.self });
		}
	}

	addVisitToPatient(visit: Visit) {
		this.patient.visits.push(visit);
		let snackBarRef = this.snackBar.open('La visita fue registrada correctamente', 'OK', {
			duration: 2500,
		});
		this.visitInFormReset();
	}

	uploadFiles(visit: Visit, newVisit: boolean) {
		if (newVisit) {
			visit.files = [];
		}
		if (this.files.length) {
			this.patientService.uploadFiles(this.files, visit.id).subscribe(result => {
				if (result.data.length) {
					this.addFileToVisit(visit, result.data);
					if (newVisit) {
						this.addVisitToPatient(visit);
					} else {
						this.files = null;
					}
					this.uploadingFiles = false;
				}
			});
		}
	}

	readImage(event, index) {
		let reader = new FileReader();
		reader.onload = (event: ProgressEvent) => {
			this.files[index]['url'] = (<FileReader>event.target).result;
		}
		reader.readAsDataURL(this.files[index]);
	}

	onFilesChanged(event) {
		this.files = event.target.files;
		if (this.visitInForm.id) {
			this.uploadingFiles = true;
			this.uploadFiles(this.visitInForm, false);
		} else {
			for (let i = 0; i < this.files.length; i++) {
				this.readImage(event, i);
			}
		}
	}

	deleteFile(file) {
		this.patientService.deleteFile(file.id)
			.subscribe(result => {
				if (result) {
					let index = this.visitInForm.files.indexOf(file);
					if (index > -1) {
						this.visitInForm.files.splice(index, 1);
					}
					let snackBarRef = this.snackBar.open('La imagen fue eliminada correctamente', 'OK', {
						duration: 2500,
					});
				}
			});
	}

	openFile(image) {
		const dialogRef = this.dialog.open(ImageDialogComponent, {
			data: image
		});
	}

	openConfirmationDialog(visit): void {
		const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
			width: '240px'
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.deleteVisit(visit);
			}
		});
	}

}
