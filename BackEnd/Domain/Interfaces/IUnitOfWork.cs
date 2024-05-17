using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IUnitOfWork
    {
        ICategory Categories { get; }
        IProduct Products { get; }
        IEmail Emails { get; }
        IRol Roles {get;}
        IUser Users {get;}
        Task<int> SaveAsync();
    }
}