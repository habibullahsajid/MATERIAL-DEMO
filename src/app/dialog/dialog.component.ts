import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogExampleComponent } from '../dialog-example/dialog-example.component';

@Component({
  selector: 'dialog-root',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    // this.dialog.open(DialogExampleComponent);
    let dialogRef= this.dialog.open(DialogExampleComponent, {data:{name:'Habib'}});
    dialogRef.afterClosed().subscribe((result: any) =>{
      console.log(`Dialog result:${result}`)
    })
  }
}
