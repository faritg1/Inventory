using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Dtos;

namespace Api.Services
{
    public interface IEmailService
    {
        void SendEmail(EmailDto model);
    }
}