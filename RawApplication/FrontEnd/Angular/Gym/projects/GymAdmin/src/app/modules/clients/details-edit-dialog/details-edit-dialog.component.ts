import {Component, Inject, OnInit} from '@angular/core';
import {Client} from '../../../shared/models/clients.model';
import {FormControl, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../users/user-dialog/user-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ClientMeasures} from '../../../shared/models/clientMeasurements.model';
import {ClientMeasuresService} from '../../../core/data-services/client-measures/client-measures.service';
import {ClientDetailsComponent, ClientMeasureDialogData} from '../client-details/client-details.component';

@Component({
  selector: 'gym-details-edit-dialog',
  templateUrl: './details-edit-dialog.component.html',
  styleUrls: ['./details-edit-dialog.component.scss']
})
export class DetailsEditDialogComponent implements OnInit {

  public measure: ClientMeasures = new ClientMeasures();
  public isUpdate = false;

  shouldersFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^(0|[1-9][0-9]*)$')
  ]);
  idFormControl =  new FormControl('', [
    Validators.required,
    Validators.pattern('^(0|[1-9][0-9]*)$')
  ]);
  weightFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^(0|[1-9][0-9]*)$')
  ]);
  bicepFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^(0|[1-9][0-9]*)$')
  ]);
  dateAddedFormControl = new FormControl('', [
    Validators.required,
  ]);

  matcher = new MyErrorStateMatcher();
  constructor(
    public dialogRef: MatDialogRef<ClientDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ClientMeasureDialogData,
    private readonly clientMeasureService: ClientMeasuresService
  ) { }
  onNoClick(): void {
    this.dialogRef.close();
  }

  public addMeasure(form): void {
    if (!form.valid) {
      return;
    }
    if (this.isUpdate) {
      this.clientMeasureService
        .editClient(this.measure).subscribe(
        () => {
          this.dialogRef.close();
        });
    } else {
      this.clientMeasureService
        .addClientMeasure(this.measure).subscribe(
        () => {
          this.dialogRef.close();
        });
    }
  }
  ngOnInit(): void {
    if (this.data.measureId > 0)
    {
      this.isUpdate = true;
      this.measure = this.data.measureData;
      this.idFormControl = new FormControl({value: '', disabled: true});
    }
  }

}
