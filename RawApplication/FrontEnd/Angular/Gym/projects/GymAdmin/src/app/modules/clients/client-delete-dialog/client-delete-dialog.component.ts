import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ClientDialogData, ClientListComponent} from '../client-list/client-list.component';
import {ClientsService} from '../../../core/data-services/clients/clients.service';

@Component({
  selector: 'gym-client-delete-dialog',
  templateUrl: './client-delete-dialog.component.html',
  styleUrls: ['./client-delete-dialog.component.scss']
})
export class ClientDeleteDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ClientListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ClientDialogData,
    private readonly clientService: ClientsService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public deleteClient(): void {
    this.clientService
      .deleteClient(this.data.clientId).subscribe(
      () => {
        this.dialogRef.close();
      });
  }
  ngOnInit(): void {
  }
}
