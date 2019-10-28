import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  EventEmitter,
  Output
} from '@angular/core';
import { AvatarGroupItem } from './avatar-group.model';

@Component({
  selector: 'vshcz-avatar-group',
  templateUrl: './avatar-group.component.html',
  styleUrls: [ './avatar-group.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarGroupComponent implements OnChanges {
  overflow: number;
  items: AvatarGroupItem[];

  @Input()
  data: AvatarGroupItem[];

  @Input()
  max: number;

  @Output()
  overflowClicked = new EventEmitter<void>();

  @Output()
  itemClicked = new EventEmitter<string>();

  ngOnChanges() {
    if (this.data && ((this.data.length > this.max) || !this.max)) {
      this.items = this.data.slice(0, this.max);
      this.overflow = this.data.length - this.max;
    } else {
      this.items = this.data;
      this.overflow = 0;
    }

  }

  _trackBy(index: number) {
    return index;
  }
}
