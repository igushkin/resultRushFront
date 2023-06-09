export class Category{
  categoryId: number;
  name: string;

  constructor(categoryId: number, name: string) {
    this.categoryId = categoryId;
    this.name = name;
  }
}

/*

public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer categoryId;
    @Basic(optional = false)
    private String name;
}

 */
