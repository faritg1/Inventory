using System.Threading.Tasks;
using Api.Dtos;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;
using Microsoft.Extensions.Options;
using Domain.Interfaces;
using Domain.Entities;

namespace Api.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;
        private readonly IUnitOfWork _unitOfWork;
        public EmailService(IConfiguration config, IUnitOfWork unitOfWork)
        {
            _config = config;
            _unitOfWork = unitOfWork;
        }

        public async Task<string> SendEmail(EmailDto model)
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(_config.GetSection("Email:UserName").Value));
            email.To.Add(MailboxAddress.Parse(model.Para));
            email.Subject = model.Asunto;
            //email.Body = new TextPart(TextFormat.Html) { Text = model.Contenido };
            email.Body = new TextPart(TextFormat.Html)
            {
                Text = GetEmailBody(model)
            };

            using var smtp = new SmtpClient();

            var emailData = new Email
            {
                Para = model.Para,
                Asunto = model.Asunto,
                Contenido = email.Body.ToString()
            };

            try
            {
                smtp.Connect(
                    _config.GetSection("Email:Host").Value,
                    Convert.ToInt32(_config.GetSection("Email:Port").Value), 
                    SecureSocketOptions.StartTls);
                smtp.Authenticate(_config.GetSection("Email:UserName").Value, _config.GetSection("Email:PassWord").Value);
                return smtp.Send(email);
            }
            catch (Exception ex)
            {
                return $"Error {ex.Message}.";
            }
            finally
            {
                smtp.Disconnect(true);
                _unitOfWork.Emails.Add(emailData);
                await _unitOfWork.SaveAsync();
            }
        }

        private string GetEmailBody(EmailDto model)
        {
            return $@"
            <!DOCTYPE html>
            <html lang=""en"">
            <head>
                <meta charset=""UTF-8"">
                <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
                <title>Email Template</title>
                <style>
                    body {{
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }}
                    .container {{
                        background-color: #ffffff;
                        margin: 0 auto;
                        padding: 20px;
                        border-radius: 8px;
                        max-width: 600px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }}
                    .header {{
                        background-color: #4CAF50;
                        color: white;
                        padding: 10px 20px;
                        border-top-left-radius: 8px;
                        border-top-right-radius: 8px;
                        text-align: center;
                    }}
                    .content {{
                        padding: 20px;
                        font-size: 16px;
                        line-height: 1.5;
                        color: #333333;
                    }}
                    .footer {{
                        background-color: #f4f4f4;
                        padding: 10px 20px;
                        border-bottom-left-radius: 8px;
                        border-bottom-right-radius: 8px;
                        text-align: center;
                        font-size: 12px;
                        color: #666666;
                    }}
                </style>
            </head>
            <body>
                <div class=""container"">
                    <div class=""header"">
                        <h1>{model.Asunto}</h1>
                    </div>
                    <div class=""content"">
                        <p>Hola,</p>
                        <p>{model.Contenido}</p>
                        <p>Atentamente,<br>Inventory</p>
                    </div>
                    <div class=""footer"">
                        <p>© 2024 Inventory. Todos los derechos reservados.</p>
                    </div>
                </div>
            </body>
            </html>";
        }
    }
}
