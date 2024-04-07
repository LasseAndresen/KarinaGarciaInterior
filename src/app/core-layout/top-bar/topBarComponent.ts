import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'top-bar',
  templateUrl: './topBarComponent.html',
  styleUrls: ['./topBarComponent.scss'],
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
