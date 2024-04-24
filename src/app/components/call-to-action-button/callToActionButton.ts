import {Component, HostBinding, Input} from "@angular/core";

@Component({
  selector: 'call-to-action-button',
  templateUrl: './callToActionButton.html',
  styleUrls: ['./callToActionButton.scss'],
  standalone: true
})
export class CallToActionButton {
  @Input()
  public title: string = '';
  @Input()
  public route: string = '';

  @HostBinding('class')
  public class: string = 'd-flex justify-content-center';
}
