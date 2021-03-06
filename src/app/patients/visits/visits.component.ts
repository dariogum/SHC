import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NgForm } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';

import { ConfigService } from './../../auth/config.service';
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

  biggerFont = false;
  currentUser = JSON.parse(localStorage.getItem('currentUser')).id;
  files: FileList = null;
  screenType = 'wide';
  @Input() patient: Patient;
  today = new Date();
  uploadingFiles = false;
  visitFormOpen = false;
  visitInForm: Visit = undefined;

  @ViewChild('visitForm') public visitForm: NgForm;
  @ViewChild('weightInput') public weightInput: ElementRef;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private configService: ConfigService,
    public dialog: MatDialog,
    private patientService: PatientService,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.breakpointObserver.observe([
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      if (result.matches) {
        this.screenType = 'handset';
      }
    });

    this.breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.TabletPortrait,
    ]).subscribe(result => {
      if (result.matches) {
        this.screenType = 'tablet';
      }
    });

    this.breakpointObserver.observe([
      Breakpoints.TabletLandscape,
      Breakpoints.WebPortrait,
      Breakpoints.WebLandscape,
    ]).subscribe(result => {
      if (result.matches) {
        this.screenType = 'wide';
      }
    });

    this.biggerFont = this.configService.getUserConfig(this.currentUser, 'biggerFont');
  }

  onEditVisitClick(visit) {
    this.visitInForm = visit;
    this.visitFormOpen = true;
    console.log(this.weightInput);
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
      const isVisitControl = this.visitForm.controls[controlName] && !this.visitForm.controls[controlName].pristine;
      if (isVisitControl) {
        this.patientService.updateVisit(this.visitInForm, this.patient.id).subscribe();
      }
    }
  }

  deleteVisit(visit) {
    this.patientService.deleteVisit(visit.id)
      .subscribe(result => {
        if (result) {
          const index = this.patient.visits.indexOf(visit);
          if (index > -1) {
            this.patient.visits.splice(index, 1);
          }
          if (visit === this.visitInForm) {
            this.closeVisitForm();
          }
          const snackBarRef = this.snackBar.open('La visita fue eliminada correctamente', 'OK', {
            duration: 2500,
          });
        }
      });
  }

  newVisitInForm() {
    this.visitInForm = new Visit();
    this.visitInForm.date = this.today;
    this.visitFormOpen = true;
  }

  closeVisitForm() {
    this.visitFormOpen = false;
    this.visitInForm = undefined;
    this.files = null;
  }

  addFileToVisit(visit: Visit, files: any) {
    for (let i = 0; i < files.length; i++) {
      visit.files.unshift({ id: files[i].data.id, url: APIVERSIONURL + files[i].links.self });
    }
  }

  addVisitToPatient(visit: Visit) {
    this.patient.visits.push(visit);
    const snackBarRef = this.snackBar.open('La visita fue registrada correctamente', 'OK', {
      duration: 2500,
    });
    this.closeVisitForm();
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
    const reader = new FileReader();
    reader.onload = (evt: ProgressEvent) => {
      this.files[index]['url'] = (<FileReader>evt.target).result;
    };
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
          const index = this.visitInForm.files.indexOf(file);
          if (index > -1) {
            this.visitInForm.files.splice(index, 1);
          }
          const snackBarRef = this.snackBar.open('La imagen fue eliminada correctamente', 'OK', {
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
