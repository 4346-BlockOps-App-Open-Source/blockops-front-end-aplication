import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  publicMode = false;
  user = {
    name: 'Usuario123',
    followedSignals: 12,
    educationLevel: 'Intermedio',
    forumReputation: 240
  };
}
