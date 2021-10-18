import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  title = 'MATERIAL-DEMO';
  notiCount = 0;
  showSpinner = false;

  loadData() {
    this.showSpinner = true;
    setTimeout(() => {
      this.showSpinner = false;
    }, 500);
  }

  opened = false;

  log(state: any) {
    console.log(state);
  }

  logChange(index: any) {
    console.log(index);
  }

  selectedValue: string | undefined;

  options: string[] = ['Angular', 'React', 'Vue'];

  objectOptions = [
    { name: 'Angular' },
    { name: 'AngularJs' },
    { name: 'React' },
    { name: 'Vue' },
  ];
  displayFn(subject: any) {
    return subject ? subject.name : undefined;
  }

  myControl = new FormControl();
  filteredOptions: Observable<string[]> | undefined;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  minDate = new Date();
  maxDate = new Date(2022, 3, 10);

  dateFilter = (date: any) => {
    const day = date.getDay();
    return day != 0 && day != 6;
  };
  constructor(private snackBar: MatSnackBar) {}
  openSnacBar(message: any, action: any) {
    this.snackBar.open(message, action);
  }

  openSnacBar1(message: any, action: any) {
    let snackBarRef = this.snackBar.open(message, action, { duration: 2000 });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('the snackbar was dismissed');
    });
    snackBarRef.onAction().subscribe(() => {
      console.log('the snackbar action was triggered!');
    });
  }

  openCustomSnackBar() {
    this.snackBar.openFromComponent(CustomSnackBarComponent, {
      duration: 2000,
    });
  }
}

@Component({
  selector: 'custom-snackbar',
  template: `<span style="color: orange;">Custom Snackbar</span>`,
})
export class CustomSnackBarComponent {}
