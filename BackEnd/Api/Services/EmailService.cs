using System.Threading.Tasks;
using Api.Dtos;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;
using Microsoft.Extensions.Options;

namespace Api.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;

        public EmailService(IConfiguration config)
        {
            _config = config;
        }

        public void SendEmail(EmailDto model)
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(_config.GetSection("Email:UserName").Value));
            email.To.Add(MailboxAddress.Parse(model.Para));
            email.Subject = model.Asunto;
            email.Body = new TextPart(TextFormat.Html) { Text = model.Contenido };

            using var smtp = new SmtpClient();
            try
            {
                smtp.Connect(
                    _config.GetSection("Email:Host").Value,
                    Convert.ToInt32(_config.GetSection("Email:Port").Value), 
                    SecureSocketOptions.StartTls);
                smtp.Authenticate(_config.GetSection("Email:UserName").Value, _config.GetSection("Email:PassWord").Value);
                smtp.Send(email);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Hay un Error en el EMAIL: " + ex.Message);
            }
            finally
            {
                smtp.Disconnect(true);
            }
        }
    }
}
