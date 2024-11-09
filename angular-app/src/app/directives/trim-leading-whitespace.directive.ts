import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[trimLeadingWhitespace]',
  standalone: true
})
export class TrimLeadingWhitespaceDirective {

  constructor() {}

  @HostListener('input', ['$event.target'])
  onInput(target: HTMLInputElement) {
    target.value = target.value.trimStart();
  }
}
