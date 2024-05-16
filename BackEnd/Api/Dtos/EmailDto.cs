using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Dtos;
public class EmailDto
{
    public string Para { get; set; }
    public string Asunto { get; set; }
    public string Contenido { get; set; }
}
