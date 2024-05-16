using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class Email : BaseEntity
    {
        public string Para { get; set; }
        public string Asunto { get; set; }
        public string Contenido { get; set; }
    }
}