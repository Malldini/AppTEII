using System;

namespace API.Domain.Entities
{
    public class Pacote
    {
        public Pacote(string nome, double preco)
        {
            Nome = nome;
            Preco = preco;
            Id = Guid.NewGuid();
        }

        public Guid Id { get; set; }
        public string Nome { get; set; }
        public double Preco { get; set; }
        public bool Done { get; set; }
    }
}
