import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {Client} from '../../../shared/models/clients.model';
import {MyErrorStateMatcher} from '../../users/user-dialog/user-dialog.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ClientDialogData, ClientListComponent} from '../client-list/client-list.component';
import {ClientsService} from '../../../core/data-services/clients/clients.service';
import {CONFIG} from '../../../config';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
  selector: 'gym-client-edit-dialog',
  templateUrl: './client-edit-dialog.component.html',
  styleUrls: ['./client-edit-dialog.component.scss']
})
export class ClientEditDialogComponent implements OnInit {

  public client: Client = new Client ();
  public isUpdate = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  heightFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^\\d{1,4}([.]\\d{1,2})?$')
  ]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  idFormControl =  new FormControl('', [
    Validators.required,
    Validators.pattern("^(0|[1-9][0-9]*)$")
  ]);
  firstNameFormControl = new FormControl('', [
    Validators.required
  ]);
  lastNameFormControl = new FormControl('', [
    Validators.required
  ]);
  dateOfBirthFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();
  constructor(
    public dialogRef: MatDialogRef<ClientListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ClientDialogData,
    private readonly clientService: ClientsService,
    private snackBar: MatSnackBar
  ) { }
  onNoClick(): void {
    this.dialogRef.close();
  }

  public addClient(form): void {
    if (!form.valid) {
      return;
    }
    if (this.isUpdate) {
      this.clientService
        .editClient(this.client).subscribe(
        () => {
          this.dialogRef.close();

          this.snackBar.open('Client updated', 'close', {
            duration: CONFIG.snackBarDuration,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        });
    } else {
      this.clientService
        .addClient(this.client).subscribe(
        () => {
          this.dialogRef.close();
          this.snackBar.open('Client added', 'close', {
            duration: CONFIG.snackBarDuration,
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        });
    }
  }
  ngOnInit(): void {
    if (this.data.clientId > 0)
    {
      this.isUpdate = true;
      this.client = this.data.clientData;
      this.idFormControl = new FormControl({value: '', disabled: true});
    }
  }
}
