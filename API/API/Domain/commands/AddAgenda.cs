using System;

namespace API.Domain.commands
{
    public class AddAgenda
    {
        public string NomeF { get; set; }
        public string Veiculo { get; set; }
        public string NomeC { get; set; }
        public string Pacote { get; set; }
        public DateTime Data { get; set; }
    }
}
