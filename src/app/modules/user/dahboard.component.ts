import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesComponent } from './notes/notes.component';

@Component({
  selector: 'app-dahboard',
  standalone: true,
  imports: [CommonModule,NotesComponent],
  templateUrl: './dahboard.component.html',
})
export class DahboardComponent {

}
