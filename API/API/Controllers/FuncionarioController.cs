using API.Domain.commands;
using API.Domain.Entities;
using LiteDB;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace API.Controllers
{
    [Route("api/funcionario")]
    public class FuncionarioController : Controller
    {
        //[HttpGet]
        //public string Get()
        //{
        //    return "API versão 1.0";
        //}


        [HttpGet]
        //[Route("api/todo/Listar")]
        public IActionResult ListarFuncionario()
        {
            List<Funcionario> funcionarios;

            using (var db = new LiteDatabase("banco.db"))
            {
                var funcionarioCollection = db.GetCollection<Funcionario>("funcionario");

                funcionarios = funcionarioCollection.FindAll().ToList();

            }
            return Ok(funcionarios);
        }

        [HttpPost]
        public IActionResult Post([FromBody]AddFuncionario request)
        {

            var funcionario = new Funcionario(request.Nome, request.Telefone, request.CPF);

            using (var db = new LiteDatabase("banco.db"))
            {
                var funcionarioCollection = db.GetCollection<Funcionario>("funcionario");
                funcionarioCollection.Insert(funcionario);
            }

            return Ok(new { Funcionario = funcionario, Mensagem = "Operação realizada com sucesso!" });
        }

        [HttpPut]
        public IActionResult Atualizar([FromBody]UpdateFuncionario request)
        {
            using (var db = new LiteDatabase("banco.db"))
            {
                var funcionarioCollection = db.GetCollection<Funcionario>("funcionario");

                var funcionario = funcionarioCollection.FindOne(x => x.Id == request.Id);

                funcionario.Nome = request.Nome;
                funcionario.Telefone = request.Telefone;
                funcionario.CPF = request.CPF;
                funcionario.Done = request.Done;

                funcionarioCollection.Update(funcionario);
            }

            return Ok(new { Mensagem = "Operação realizada com sucesso!" });
        }


        [HttpDelete("{id:guid}")]
        public IActionResult Delete(Guid id)
        {
            using (var db = new LiteDatabase("banco.db"))
            {
                var funcionarioCollection = db.GetCollection<Funcionario>("funcionario");

                funcionarioCollection.Delete(id);
            }

            return Ok(new { Mensagem = "Operação realizada com sucesso!" });
        }
    }
}
