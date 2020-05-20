using System;

namespace API.Domain.commands
{
    public class UpdatePacote
    {
        public Guid Id { get; set; }
        public string Nome { get; set; }
        public double Preco { get; set; }
        public bool Done { get; set; }
    }
}
