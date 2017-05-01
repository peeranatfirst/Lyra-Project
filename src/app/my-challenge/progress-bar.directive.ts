import { Directive, ElementRef , Input } from '@angular/core';
import { FirebaseService } from "app/services/firebase.service";

@Directive({
  selector: '[appProgressBar]'
})
export class ProgressBarDirective {
  @Input('myPercent') percentNum: string;
  percent: any;
  constructor(private el: ElementRef) {

    this.percent = [<HTMLDivElement>document.getElementById('sentPercent')];
    this.el.nativeElement.style.width = '60%';
  }

}
