using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IUnitOfWork
    {
        ICategory Category { get; }
        IProduct Product { get; }
        Task<int> SaveAsync();
    }
}