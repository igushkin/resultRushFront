import {Category} from "../model/Category";
import {Priority} from "../model/Priority";
import {Goal} from "../model/Goal";
import {Milestone} from "../model/Milestone";

export class TestData {

  static categories: Category[] = [];

  static priorities: Priority[] = [
    {id: 1, title: 'Низкий'},
    {id: 2, title: 'Средний'},
    {id: 3, title: 'Высокий'}
  ];

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
      description: 'Being able to describe your goals in written form gives you the best chance of goal success. Writing down your goals helps you to clarify exactly what you want to achieve, which helps guide your daily actions towards goal achievement. Written down goals are more powerful than goals you keep in your mind.',
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
      category: TestData.categories[0]
    },
    {
      id: 4,
      title: 'Залить бензин полный бак',
      description: 'desc 1',
      isCompleted: false,
      deadline: new Date('2019-04-10'),
      priority: TestData.priorities[2],
      category: TestData.categories[1]
    },
    {
      id: 5,
      title: 'Передать отчеты начальнику управления',
      description: 'desc 2',
      isCompleted: false,
      deadline: new Date('2019-04-12'),
      priority: TestData.priorities[1],
      category: TestData.categories[2]
    },
    {
      id: 6,
      title: 'Передать отчеты начальнику управления',
      description: 'desc 3',
      isCompleted: true,
      deadline: new Date('2019-04-12'),
      priority: TestData.priorities[3],
      category: TestData.categories[0]
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
      category: TestData.categories[0]
    },
    {
      id: 4,
      title: 'Залить бензин полный бак',
      description: 'desc 1',
      isCompleted: false,
      deadline: new Date('2019-04-10'),
      priority: TestData.priorities[2],
      category: TestData.categories[1]
    },
    {
      id: 5,
      title: 'Передать отчеты начальнику управления',
      description: 'desc 2',
      isCompleted: false,
      deadline: new Date('2019-04-12'),
      priority: TestData.priorities[1],
      category: TestData.categories[2]
    },
    {
      id: 6,
      title: 'Передать отчеты начальнику управления',
      description: 'desc 3',
      isCompleted: true,
      deadline: new Date('2019-04-12'),
      priority: TestData.priorities[3],
      category: TestData.categories[0]
    }
  ];

  static milestones: Milestone[] = [
    {
      id: 1,
      title: 'Шаг 1',
      isCompleted: false,
      goal: TestData.goals[1]
    },
    {
      id: 2,
      title: 'Шаг 2',
      isCompleted: false,
      goal: TestData.goals[1]
    },
    {
      id: 3,
      title: 'Шаг 3',
      isCompleted: true,
      goal: TestData.goals[1]
    }
  ];
}
