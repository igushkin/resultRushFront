export class Priority {
  priorityId: number;
  name: string;
  color: string;

  constructor(priorityId: number, name: string, color: string) {
    this.priorityId = priorityId;
    this.name = name;
    this.color = color;
  }
}

/*

public class Priority {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer priorityId;
    @Basic(optional = false)
    private String name;
    @Basic(optional = false)
    private String color;
}
 */
