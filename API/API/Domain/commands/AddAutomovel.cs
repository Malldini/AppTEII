using System;

namespace API.Domain.commands
{
    public class AddAutomovel
    {
        public string Nome { get; set; }
        public string Marca { get; set; }
        public Int32 Porta { get; set; }
        public string Placa { get; set; }
    }
}
