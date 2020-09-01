import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ClientDialogData, ClientListComponent} from '../client-list/client-list.component';
import {ClientsService} from '../../../core/data-services/clients/clients.service';
import {ClientDetailsComponent} from '../client-details/client-details.component';
import {ClientMeasuresService} from '../../../core/data-services/client-measures/client-measures.service';

@Component({
  selector: 'gym-details-delete-dialog',
  templateUrl: './details-delete-dialog.component.html',
  styleUrls: ['./details-delete-dialog.component.scss']
})
export class DetailsDeleteDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ClientDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ClientDialogData,
    private readonly clientMeasuresService: ClientMeasuresService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public deleteClient(): void {
    this.clientMeasuresService
      .deleteClientMeasure(this.data.clientId).subscribe(
      () => {
        this.dialogRef.close();
      });
  }
  ngOnInit(): void {
  }

}
