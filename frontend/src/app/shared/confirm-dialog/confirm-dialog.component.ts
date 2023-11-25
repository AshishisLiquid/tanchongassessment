import { Component, Inject, Optional,} from '@angular/core';
import { User } from '../users.types';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {
  user!: User
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: User) {
    this.user = {...data};
  }

  ngOnInit(): void {
  }

  onYesClick(): void {
    this.dialogRef.close({event: 'yes'});
  }

  onNoClick(): void {
    this.dialogRef.close({event: 'no'});
  }
}
