import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Rate } from './rate.constants';

export interface RateSymbol {
  isRated: boolean;
}

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RateComponent),
    multi: true,
  }],
})
export class RateComponent implements ControlValueAccessor, OnInit {
  RATE = Rate;
  innerValue = 0;
  stars: RateSymbol[] = [];
  isDisabled: boolean;
  isTouched: boolean;

  @Input()
  get maxValue(): number {
    return this._maxValue;
  }
  set maxValue(value: number) {
    if (typeof value === 'string') {
      value = +value;
    }
    this._maxValue = value;
    this.updateStarsSize();
  }
  // tslint:disable-next-line:variable-name
  private _maxValue;

  @Input()
  get value(): number {
    return this._value;
  }
  set value(value: number) {
    if (typeof value === 'string') {
      value = +value;
    }
    this._value = value;
    this.innerValue = value;
    this.updateStarsSize();
  }
  // tslint:disable-next-line:variable-name
  private _value;

  @Output() valueChanges = new EventEmitter<number>();

  constructor(
    private cdr: ChangeDetectorRef,
  ) {
  }

  onChange(_: any): void {}
  onTouched(): void {}
  onDisabled(): void {}

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    this.cdr.detectChanges();
  }

  writeValue(value: number): void {
    this.value = value;
    this.rerender();
  }

  ngOnInit(): void {
    if (!this.maxValue) {
      this.maxValue = Rate.DEFAULT_SIZE;
    }
    if (this.value === undefined) {
      this.value = Rate.DEFAULT_VALUE;
    }
    this.rerender();
  }

  onOver(index: number): void {
    const updatedValue = index + 1;
    if (this.innerValue !== updatedValue) {
      this.innerValue = updatedValue;
      this.rerender(index);
    }
  }

  onOut(): void {
    if (this.innerValue !== this.value) {
      this.innerValue = this.value;
      this.rerender();
    }
  }

  onClick(index: number): void {
    const updatedValue = index + 1;
    if (this.value !== updatedValue) {
      this.value = updatedValue;
      this.rerender();
      this.valueChanges.emit(this.value);
      this.onChange(this.value);
      if (!this.isTouched) {
        this.isTouched = true;
        this.onTouched();
      }
    }
  }

  private rerender(targetIndex?: number): void {
    const targetValue = targetIndex || this.innerValue - 1;
    for (let i = 0; i < this.stars.length; i++) {
      this.stars[i] = {isRated: i <= targetValue} as RateSymbol;
    }
  }

  private updateStarsSize(): void {
    this.stars = (new Array<RateSymbol>(this.maxValue)).fill({isRated: false});
  }
}
