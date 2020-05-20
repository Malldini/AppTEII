using System;

namespace API.Domain.commands
{
    public class UpdateCliente
    {
        public Guid Id { get; set; }
        public string Nome { get; set; }
        public string Telefone { get; set; }
        public string CPF { get; set; }
        public bool Done { get; set; }
    }
}
