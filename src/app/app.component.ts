import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  formG = new FormGroup({
    stars: new FormControl({value: 2, disabled: true}),
  });


  ngOnInit(): void {
    setTimeout(() => {
      console.log('enable form');
      this.formG.enable();
    }, 3000);

    this.formG.valueChanges.subscribe(form => {
      console.log('valueChanges', this.formG.get('stars'));
    });
  }
}
