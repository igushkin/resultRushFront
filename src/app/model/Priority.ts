export class Priority {
  id: number;
  title: string;

  constructor(priorityId: number, title: string) {
    this.id = priorityId;
    this.title = title;
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
