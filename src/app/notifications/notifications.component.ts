import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications',
  imports: [],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {

}

interface Notification {
  id: number;
  message: string;
  date: string;
  leido: boolean;
  categoria: 'Cripto' | 'Acciones' | 'Bonos' | 'Forex';
}

const notifications: Notification[] = [
  { id: 1, message: 'Bitcoin alcanza nuevo máximo', date: '2024-06-10 14:30', leido: false, categoria: 'Cripto' },
  { id: 2, message: 'Acciones de Tesla suben un 5%', date: '2024-06-09 09:00', leido: true, categoria: 'Acciones' },
  { id: 3, message: 'Rendimiento aumento en bonos corporativos', date: '2024-06-08 16:20', leido: false, categoria: 'Bonos' },
  { id: 4, message: 'El dólar baja frente al euro', date: '2024-06-07 12:00', leido: true, categoria: 'Forex' },
  { id: 5, message: 'Ethereum lanza actualización importante', date: '2024-06-06 11:15', leido: false, categoria: 'Cripto' },
  { id: 6, message: 'Apple anuncia nuevo producto', date: '2024-06-05 10:00', leido: false, categoria: 'Acciones' },
  { id: 7, message: 'Nuevo bono gubernamental emitido', date: '2024-06-04 15:45', leido: true, categoria: 'Bonos' },
  { id: 8, message: 'El yen se fortalece ante el dólar', date: '2024-06-03 13:30', leido: false, categoria: 'Forex' }
];

type FilterType = 'all' | 'leidas' | 'no-leidas' | 'Cripto' | 'Acciones' | 'Bonos' | 'Forex';

let currentFilter: FilterType = 'all';

function renderNotifications() {
  const list = document.getElementById('notificationsList');
  if (!list) return;

  list.innerHTML = '';

  // Filtrado según filtro actual
  let filtered = notifications;
  if (currentFilter === 'leidas') {
    filtered = notifications.filter(n => n.leido);
  } else if (currentFilter === 'no-leidas') {
    filtered = notifications.filter(n => !n.leido);
  } else if (currentFilter === 'Cripto' || currentFilter === 'Acciones' || currentFilter === 'Bonos' || currentFilter === 'Forex') {
    filtered = notifications.filter(n => n.categoria === currentFilter);
  }

  if (filtered.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'No hay notificaciones para este filtro.';
    li.style.fontStyle = 'italic';
    li.style.textAlign = 'center';
    list.appendChild(li);
    return;
  }

  filtered.forEach(n => {
    const item = document.createElement('li');
    if (n.leido) item.classList.add('leido');

    const textContentDiv = document.createElement('div');
    textContentDiv.className = 'text-content';
    textContentDiv.textContent = n.message;

    const dateDiv = document.createElement('div');
    dateDiv.className = 'date';
    dateDiv.textContent = n.date;

    item.appendChild(textContentDiv);
    item.appendChild(dateDiv);
    list.appendChild(item);
  });
}

function setupFilterButtons() {
  // Todos los botones de filtro
  const buttons = document.querySelectorAll('button.filter-btn');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      // Remover active y aria-pressed de todos
      buttons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      // Activar el botón clickeado
      button.classList.add('active');
      button.setAttribute('aria-pressed', 'true');

      const filter = button.getAttribute('data-filter') as FilterType;
      if (filter) {
        currentFilter = filter;
        renderNotifications();
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupFilterButtons();
  renderNotifications();
});
