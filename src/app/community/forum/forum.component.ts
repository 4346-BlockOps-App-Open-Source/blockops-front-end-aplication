import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./forum.component.css']
})
export class ForumComponent {
  posts = [
    {
      id: 1,
      author: 'Anónimo',
      content: '¿Qué estrategias usan para señales de compra?',
      responses: [],
      notifications: 0
    }
  ];

  newPostContent = '';
  newResponses: string[] = [];

  constructor() {
    this.newResponses = this.posts.map(() => '');
  }

  createPost() {
    if (this.newPostContent.trim()) {
      this.posts.unshift({
        id: Date.now(),
        author: 'Anónimo',
        content: this.newPostContent,
        responses: [],
        notifications: 0
      });
      this.newPostContent = '';
      this.newResponses.unshift('');
    }
  }

  respond(index: number) {
    const response = this.newResponses[index];
    if (response.trim()) {
      //this.posts[index].responses.push({ author: 'Anónimo', content: response });
      this.posts[index].notifications++;
      this.newResponses[index] = '';
    }
  }

  clearNotification(index: number) {
    this.posts[index].notifications = 0;
  }
}
