using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Helpers
{
    public class Authorization
    {
        public enum Roles
        {
            Administrator,
            Employee
        }

        public const Roles rol_default = Roles.Employee;
    }
}