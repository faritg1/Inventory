using System;
using System.Collections.Generic;
using Domain.Entities;

namespace Domain.Entities;

public partial class Category : BaseEntity
{
    public string Name { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
