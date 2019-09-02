/**
* Список элементов меню
* children - элементы подменю
* childGetter - геттер для получения вложенных элементов
*/
export default [
  {
    name: 'Показатели',
    path: '/'
  },
  {
    name: 'Управление пользователями',
    path: '/users'
  },
  {
    name: 'Управление показателями',
    children: [
      {
        name: 'Сферы',
        entityName: 'spheres',
        childGetter: 'app/spheres'
      }
    ]
  }
]
