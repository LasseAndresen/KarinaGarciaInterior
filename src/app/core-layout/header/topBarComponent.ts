import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {NavigationButtonComponent} from "../../components/navigation-button/navigationButtonComponent";

@Component({
  selector: 'page-header',
  templateUrl: './topBarComponent.html',
  styleUrls: ['./topBarComponent.scss'],
  imports: [
    NavigationButtonComponent
  ],
  standalone: true
})
export class TopBarComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription[] = [];
  protected logoSrc: string = 'assets/Placeholder.png';

  constructor(
  ) {}

  public ngOnInit() {
  }

  public ngOnDestroy() {
    this._subscriptions.forEach((s) => s.unsubscribe());
  }

  public onLogoClick() {}
}
