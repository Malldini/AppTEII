using System;

namespace API.Domain.commands
{
    public class UpdateAgenda
    {
        public Guid Id { get; set; }
        public string NomeF { get; set; }
        public string Veiculo { get; set; }
        public string NomeC { get; set; }
        public string Pacote { get; set; }
        public DateTime Data { get; set; }
        public bool Done { get; set; }
    }
}
