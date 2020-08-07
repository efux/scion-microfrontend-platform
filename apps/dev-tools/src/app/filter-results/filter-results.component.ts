import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Capability } from '@scion/microfrontend-platform';
import { ManifestFilterStore } from '../find-capabilities/manifest-filter-store.service';

@Component({
  selector: 'devtools-filter-results',
  templateUrl: './filter-results.component.html',
  styleUrls: ['./filter-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterResultsComponent {

  public title = 'Filter Results';
  public capabilityLookupResult$: Observable<Capability[]>;

  constructor(private _manifestFilterStore: ManifestFilterStore) {
    this.capabilityLookupResult$ = this._manifestFilterStore.results$();
  }
}
