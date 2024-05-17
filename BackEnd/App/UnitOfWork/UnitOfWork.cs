using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using App.Repositories;
using Domain.Interfaces;
using Persistence.Data;

namespace App.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private readonly InventoryContext _context;
        public UnitOfWork(InventoryContext context)
        {
            _context = context;
        }

        private ICategory _categories;
        private IProduct _products;
        private IEmail _emails;
        private IUser _users;
        private IRol _roles;

        public ICategory Categories 
        {
        get
            {
                if (_categories == null)
                {
                    _categories = new CategoryRepository(_context);
                }
                return _categories;
            }
        }

        public IProduct Products 
        {
        get
            {
                if (_products == null)
                {
                    _products = new ProductRepository(_context);
                }
                return _products;
            }
        }
        public IEmail Emails 
        {
        get
            {
                if (_emails == null)
                {
                    _emails = new EmailRepository(_context);
                }
                return _emails;
            }
        }
        public IUser Users 
        {
        get
            {
                if (_users == null)
                {
                    _users = new UserRepository(_context);
                }
                return _users;
            }
        }
        public IRol Roles 
        {
        get
            {
                if (_roles == null)
                {
                    _roles = new RolRepository(_context);
                }
                return _roles;
            }
        }

        public Task<int> SaveAsync()
        {
            return _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}