import { Directive, ElementRef , Input } from '@angular/core';
import { FirebaseService } from "app/services/firebase.service";

@Directive({
  selector: '[appProgressBar]'
})
export class ProgressBarDirective {
  @Input('myPercent') percentNum: string;

  constructor(private el: ElementRef) {
    this.percentShow(this.percentNum);
  }
  private percentShow(num: string){
    let x = num+"%";
    this.el.nativeElement.style.width = x;
  }


}
