using System;

namespace API.Domain.Entities
{
    public class Funcionario
    {
        public Funcionario(string nome, string tel, string cpf)
        {
            Nome = nome;
            Telefone = tel;
            CPF = cpf;
            Id = Guid.NewGuid();
        }

        public Guid Id { get; set; }
        public string Nome { get; set; }
        public string Telefone { get; set; }
        public string CPF { get; set; }
        public bool Done { get; set; }
    }
}
