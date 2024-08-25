import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiripiriMarkdownComponent } from './siripiri-markdown/siripiri-markdown.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    SiripiriMarkdownComponent,
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {

  markdown : string | undefined;
  
  preventTab(event: KeyboardEvent) {
    if(event.key === `Tab`) {
      event.preventDefault();
      if(this.markdown != null)
        this.markdown = this.markdown + `\t`;
      else
        this.markdown = `\t`;
    }
  }
}
