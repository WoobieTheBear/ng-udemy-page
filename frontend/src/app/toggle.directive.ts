import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[toggle]',
  standalone: true
})
export class ToggleDirective {
  @HostBinding('class.open') isOpen = false;
  @HostListener('click') toggleOpen() {
    console.log('toggleOpen()');
    this.isOpen = !this.isOpen;
  }
  constructor() { }

}
