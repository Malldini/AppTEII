using System;

namespace API.Domain.Entities
{
    public class Agenda
    {
        public Agenda(string nomeF, string veiculo, string nomeC, string pacote, DateTime data)
        {
            NomeF = nomeF;
            Veiculo = veiculo;
            NomeC = nomeC;
            Pacote = pacote;
            Data = data;
            Id = Guid.NewGuid();
        }

        public Guid Id { get; set; }
        public string NomeF { get; set; }
        public string Veiculo { get; set; }
        public string NomeC { get; set; }
        public string Pacote { get; set; }
        public DateTime Data { get; set; }
        public bool Done { get; set; }
    }
}
