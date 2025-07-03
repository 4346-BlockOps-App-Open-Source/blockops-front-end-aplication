import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Post {
  id: number;
  autor: string;
  contenido: string;
  respuestas: string[];
  notificaciones: number;
}

@Component({
  selector: 'app-comunidad',
  templateUrl: './community.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  styleUrls: ['./community.component.css']
})
export class ComunidadComponent {
  publicMode: boolean = false;
  // Datos del perfil
  // Datos del perfil
  usuario = {
    nombre: 'Usuario123',
    senalesSeguidas: 12,
    nivelEducativo: 'Intermedio',
    reputacion: 240
  };

  // Foro
  posts: Post[] = [
    {
      id: 1,
      autor: 'Anónimo',
      contenido: '¿Qué señales usan para decisiones de compra?',
      respuestas: [],
      notificaciones: 0
    }
  ];

  nuevaPublicacion: string = '';
  nuevasRespuestas: string[] = [];

  // Reputación de comunidad
  usuarios = [
    { nombre: 'Usuario123', reputacion: 240, respuestas: 30 },
    { nombre: 'TraderPro', reputacion: 150, respuestas: 12 },
    { nombre: 'Aprendiz99', reputacion: 80, respuestas: 5 }
  ];

  constructor() {
    this.nuevasRespuestas = this.posts.map(() => '');
  }
  
  crearPublicacion() {
    if (this.nuevaPublicacion.trim()) {
      this.posts.unshift({
        id: Date.now(),
        autor: 'Anónimo',
        contenido: this.nuevaPublicacion,
        respuestas: [],
        notificaciones: 0
      });
      this.nuevasRespuestas.unshift('');
      this.nuevaPublicacion = '';
    }
  }

  responder(i: number) {
    const respuesta = this.nuevasRespuestas[i];
    if (respuesta.trim()) {
      this.posts[i].respuestas.push(respuesta);
      this.posts[i].notificaciones++;
      this.nuevasRespuestas[i] = '';
    }
  }

  limpiarNotificaciones(i: number) {
    this.posts[i].notificaciones = 0;
  }

}
