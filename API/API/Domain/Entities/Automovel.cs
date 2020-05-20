using System;

namespace API.Domain.Entities
{
    public class Automovel
    {
        public Automovel(string nome, string marca, Int32 porta, string placa)
        {
            Nome = nome;
            Marca = marca;
            Porta = porta;
            Placa = placa;
            Id = Guid.NewGuid();
        }

        public Guid Id { get; set; }
        public string Nome { get; set; }
        public string Marca { get; set; }
        public Int32 Porta { get; set; }
        public string Placa { get; set; }
        public bool Done { get; set; }
    }
}
