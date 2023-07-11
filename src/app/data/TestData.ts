import {Category} from "../model/Category";
import {Priority} from "../model/Priority";
import {Goal} from "../model/Goal";

export class TestData {

  static categories: Category[] = [
    {id: 1, title: 'Работа', color: '#e5e5e5'},
    {id: 2, title: 'Семья', color: '#85D1B2'},
    {id: 3, title: 'Учеба', color: '#F1828D'}
  ];

  static priorities: Priority[] = [
    {id: 1, title: 'Низкий'},
    {id: 2, title: 'Средний'},
    {id: 3, title: 'Высокий'}
  ];

  // не забывать - индексация приоритетов и категорий начинается с нуля
  static goals: Goal[] = [
    {
      id: 1,
      title: 'Залить бензин полный бак',
      description: 'desc 1',
      isCompleted: false,
      deadline: new Date('2019-04-10'),
      priority: TestData.priorities[2],
      category: TestData.categories[1]
    },
    {
      id: 2,
      title: 'Передать отчеты начальнику управления',
      description: 'desc 2',
      isCompleted: false,
      deadline: new Date('2019-04-12'),
      priority: TestData.priorities[1],
      category: TestData.categories[2]
    },
    {
      id: 3,
      title: 'Передать отчеты начальнику управления',
      description: 'desc 3',
      isCompleted: true,
      deadline: new Date('2019-04-12'),
      priority: TestData.priorities[3],
      category: TestData.categories[3]
    },
    {
      id: 1,
      title: 'Залить бензин полный бак',
      description: 'desc 1',
      isCompleted: false,
      deadline: new Date('2019-04-10'),
      priority: TestData.priorities[2],
      category: TestData.categories[1]
    },
    {
      id: 2,
      title: 'Передать отчеты начальнику управления',
      description: 'desc 2',
      isCompleted: false,
      deadline: new Date('2019-04-12'),
      priority: TestData.priorities[1],
      category: TestData.categories[2]
    },
    {
      id: 3,
      title: 'Передать отчеты начальнику управления',
      description: 'desc 3',
      isCompleted: true,
      deadline: new Date('2019-04-12'),
      priority: TestData.priorities[3],
      category: TestData.categories[3]
    }
  ];
}
