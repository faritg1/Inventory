using System;
using System.Collections.Generic;

namespace Domain.Entities;

public partial class Product : BaseEntity
{
    public string Code { get; set; }

    public string Name { get; set; }

    public float Price { get; set; }

    public int CategoryId { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public virtual Category Category { get; set; }
}
