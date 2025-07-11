import { Component } from '@angular/core';

@Component({
  selector: 'app-reputation',
  templateUrl: './reputation.component.html',
  standalone: true,
  styleUrls: ['./reputation.component.css']
})
export class ReputationComponent {
  users = [
    { name: 'Usuario123', reputation: 240, responses: 30 },
    { name: 'TraderPro', reputation: 150, responses: 12 },
    { name: 'Aprendiz99', reputation: 80, responses: 5 }
  ];
}
