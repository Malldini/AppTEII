using System;

namespace API.Domain.commands
{
    public class UpdateAutomovel
    {
        public Guid Id { get; set; }
        public string Nome { get; set; }
        public string Marca { get; set; }
        public Int32 Porta { get; set; }
        public string Placa { get; set; }
        public bool Done { get; set; }
    }
}
