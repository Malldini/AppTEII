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
    [Route("api/agenda")]
    public class AgendaController : Controller
    {
        //[HttpGet]
        //public string Get()
        //{
        //    return "API versão 1.0";
        //}


        [HttpGet]
        //[Route("api/todo/Listar")]
        public IActionResult ListarAgenda()
        {
            List<Agenda> agendas;

            using (var db = new LiteDatabase("banco.db"))
            {
                var agendaCollection = db.GetCollection<Agenda>("agenda");

                agendas = agendaCollection.FindAll().ToList();

            }
            return Ok(agendas);
        }

        [HttpPost]
        public IActionResult Post([FromBody]AddAgenda request)
        {

            var agenda = new Agenda(request.NomeF, request.Veiculo, request.NomeC, request.Pacote, request.Data);

            using (var db = new LiteDatabase("banco.db"))
            {
                var agendaCollection = db.GetCollection<Agenda>("agenda");
                agendaCollection.Insert(agenda);
            }

            return Ok(new { agenda = agenda, Mensagem = "Operação realizada com sucesso!" });
        }

        [HttpPut]
        public IActionResult Atualizar([FromBody]UpdateAgenda request)
        {
            using (var db = new LiteDatabase("banco.db"))
            {
                var agendaCollection = db.GetCollection<Agenda>("agenda");

                var agenda = agendaCollection.FindOne(x => x.Id == request.Id);

                agenda.NomeF = request.NomeF;
                agenda.Veiculo = request.Veiculo;
                agenda.NomeC = request.NomeC;
                agenda.Pacote = request.Pacote;
                agenda.Data = request.Data;
                agenda.Done = request.Done;

                agendaCollection.Update(agenda);
            }

            return Ok(new { Mensagem = "Operação realizada com sucesso!" });
        }


        [HttpDelete("{id:guid}")]
        public IActionResult Delete(Guid id)
        {
            using (var db = new LiteDatabase("banco.db"))
            {
                var agendaCollection = db.GetCollection<Agenda>("agenda");

                agendaCollection.Delete(id);
            }

            return Ok(new { Mensagem = "Operação realizada com sucesso!" });
        }
    }
}
