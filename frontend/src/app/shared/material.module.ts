import { NgModule } from "@angular/core";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

const modules = [
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule
]

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class MaterialModule {}