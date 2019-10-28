import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AvatarComponent } from './avatar.component';

@NgModule({
  declarations: [ AvatarComponent ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports: [ AvatarComponent ]
})
export class AvatarModule { }
