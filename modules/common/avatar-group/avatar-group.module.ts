import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AvatarModule } from '@app/common/avatar';
import { AvatarGroupComponent } from './avatar-group.component';

@NgModule({
  declarations: [ AvatarGroupComponent ],
  imports: [
    CommonModule,
    AvatarModule,
    MatTooltipModule
  ],
  exports: [ AvatarGroupComponent ]
})
export class AvatarGroupModule { }
