import {
  Component,
  ChangeDetectionStrategy,
  Input,
  HostBinding,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import * as md5 from 'blueimp-md5';
import { AvatarSource } from './avatar.model';

@Component({
  selector: 'vshcz-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: [ './avatar.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent implements OnInit {
  isLoading = true;

  @Input()
  set mail(v) {
    this._mail = v;
    this._hash = (<string> md5(v)).trim().toLocaleLowerCase();
  }

  get mail() {
    return this._mail;
  }

  @Input()
  web: string;

  @Input()
  extension = 'jpg';

  @Input()
  image: string;

  @Input()
  source: AvatarSource = 'image';

  @Input()
  set size(v) {
    this._size = coerceNumberProperty(v);
  }

  get size() {
    return this._size;
  }

  @HostBinding('style.height.px')
  get styleHeight() {
    return this.size;
  }

  @HostBinding('style.width.px')
  get styleWidth() {
    return this.size;
  }

  get imageUrl() {

    switch (this.source) {
      case 'image':
        return this.image;
      case 'gravatar':
        return `https://www.gravatar.com/avatar/${this._hash}.${this.extension}?s=${this.size}&d=identicon`;
      case 'clearbit':
        let web = this.web;

        if (this.web && this.web[this.web.length - 1] === '/') {
          web = this.web.slice(0, -1);
        }

        let webWithoutHttp = web;

        if (this.web) {
          webWithoutHttp = web.replace(/(^\w+:|^)\/\//, '');
        }

        return this.web
          ? `//logo.clearbit.com/${webWithoutHttp}`
          : undefined;
    }
  }

  private _mail: string;
  private _hash: string;
  private _size = 200;

  constructor(
    private _sanitizer: DomSanitizer,
    private _cdRef: ChangeDetectorRef
  ) {

  }

  ngOnInit() {
    const self = this;
    function load() {
      const img = new Image();
      img.src = self.imageUrl;
      img.onload = () => {
        self.isLoading = false;
        self._cdRef.markForCheck();
      };

      img.onerror = () => {
        self.isLoading = false;
        self._cdRef.markForCheck();
      };
    }

    load();
  }

}
