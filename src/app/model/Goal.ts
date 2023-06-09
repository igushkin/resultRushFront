import {Category} from "./Category";
import {Priority} from "./Priority";

export class Goal {
  goalId: number;
  name: string;
  description: string;
  isCompleted: boolean;
  deadline: Date;
  category: Category;
  priority: Priority;

  constructor(goalId: number, name: string, description: string, isCompleted: boolean, deadline: Date, category: Category, priority: Priority) {
    this.goalId = goalId;
    this.name = name;
    this.description = description;
    this.isCompleted = isCompleted;
    this.deadline = deadline;
    this.category = category;
    this.priority = priority;
  }
}

/*
public class Goal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer goalId;
    @Basic(optional = false)
    private String name;
    @Basic(optional = false)
    private String description;
    @Basic(optional = false)
    private Boolean isCompleted;
    @Basic(optional = false)
    private Instant deadline;
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", referencedColumnName = "categoryId")
    private Category category;
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "priority_id", referencedColumnName = "priorityId")
    private Priority priority;
}

 */
