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
    [Route("api/pacote")]
    public class PacoteController : Controller
    {
        //[HttpGet]
        //public string Get()
        //{
        //    return "API versão 1.0";
        //}


        [HttpGet]
        //[Route("api/todo/Listar")]
        public IActionResult ListarPacote()
        {
            List<Pacote> pacotes;

            using (var db = new LiteDatabase("banco.db"))
            {
                var pacoteCollection = db.GetCollection<Pacote>("pacote");

                pacotes = pacoteCollection.FindAll().ToList();

            }
            return Ok(pacotes);
        }

        [HttpPost]
        public IActionResult Post([FromBody]AddPacote request)
        {

            var pacote = new Pacote(request.Nome, request.Preco);

            using (var db = new LiteDatabase("banco.db"))
            {
                var pacoteCollection = db.GetCollection<Pacote>("pacote");
                pacoteCollection.Insert(pacote);
            }

            return Ok(new { pacote = pacote, Mensagem = "Operação realizada com sucesso!" });
        }

        [HttpPut]
        public IActionResult Atualizar([FromBody]UpdatePacote request)
        {
            using (var db = new LiteDatabase("banco.db"))
            {
                var pacoteCollection = db.GetCollection<Pacote>("pacote");

                var pacote = pacoteCollection.FindOne(x => x.Id == request.Id);

                pacote.Nome = request.Nome;
                pacote.Preco = request.Preco;
                pacote.Done = request.Done;

                pacoteCollection.Update(pacote);
            }

            return Ok(new { Mensagem = "Operação realizada com sucesso!" });
        }


        [HttpDelete("{id:guid}")]
        public IActionResult Delete(Guid id)
        {
            using (var db = new LiteDatabase("banco.db"))
            {
                var pacoteCollection = db.GetCollection<Pacote>("pacote");

                pacoteCollection.Delete(id);
            }

            return Ok(new { Mensagem = "Operação realizada com sucesso!" });
        }
    }
}
