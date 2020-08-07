import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Application, Beans, ManifestService } from '@scion/microfrontend-platform';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'devtools-app-list-item',
  templateUrl: './app-list-item.component.html',
  styleUrls: ['./app-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppListItemComponent implements OnInit {

  @Input()
  public app: Application;
  public capabilityCount$: Observable<number>;
  public intentionCount$: Observable<number>;

  public ngOnInit(): void {
    this.capabilityCount$ =  Beans.get(ManifestService).lookupCapabilities$({appSymbolicName: this.app.symbolicName})
      .pipe(map(capabilities => capabilities.length));
    this.intentionCount$ =  Beans.get(ManifestService).lookupIntentions$({appSymbolicName: this.app.symbolicName})
      .pipe(map(intentions => intentions.length));
  }

}
