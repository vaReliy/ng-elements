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
      console.log('Enable form from disabled state');
      this.formG.enable();
    }, 3000);

    this.formG.valueChanges.subscribe(form => {
      const stars = this.formG.get('stars');
      console.log('Form valueChanges: value =', stars.value, 'touched =', stars.touched);
    });
  }
}
