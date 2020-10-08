# NgElements

Test task of ng-elements.  
Need to implement a rate-component (stars).

## How to run demo:
```
# Install npm dependencies:
npm i
# Run demo:
npm run demo
# NOTICE: the project uses the global npm http-server.
# For instal it globally:
npm i -g http-server
# The demo is on http://localhost:8082/
```

## How to usage as Custom Element:
Example of [index.html](./some-app/index.html)

For usage a `star-rate` element, You need append to html-file
1. the element itself
`<stars-rate max-value="5" value="2"></stars-rate>`
2. the next scripts:
```
<script src="https://cdnjs.cloudflare.com/ajax/libs/zone.js/0.9.1/zone.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.2.10/custom-elements-es5-adapter.js"></script>
<script type="text/javascript" src="http://localhost:8081/main.js"></script>
```
To handle value change you might to subscribe to 'valueChanges' event:
```
window.onload = () => (function () {
      const resForm = document.querySelector('stars-rate');
      if (resForm !== null) {
        resForm.addEventListener('valueChanges', (event) => console.log('stars-rate =>', event.detail));
      }
    }());
```


Params of `stars-rate`.  
1. Input params:
 * max-value | length of rate stars (number of stars). Default is 5.
 * value | selected stars value. Default is 0 (all are unselected).
2. Output params:
 * 'valueChanges' Event | the value of selected stars (event.detail).


##
## How to usage as Angular Component:
1. Need to update AppModule.ts to:
```
@NgModule({
  declarations: [
    AppComponent,
    RateComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
``` 
2. Uncomment app.component.html to:
```
<form [formGroup]="formG">
  <app-rate formControlName="stars"></app-rate>
</form>
```
3. You can usage 'app-rate' as an Angular Element in Angular project as a custom formcontrol.
4. For demo run
```
npm run start
# The demo is on http://localhost:4200/
```
