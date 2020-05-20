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
    [Route("api/automovel")]
    public class AutomovelController : Controller
    {
        //[HttpGet]
        //public string Get()
        //{
        //    return "API versão 1.0";
        //}


        [HttpGet]
        //[Route("api/todo/Listar")]
        public IActionResult ListarAutomovel()
        {
            List<Automovel> automoveis;

            using (var db = new LiteDatabase("banco.db"))
            {
                var automovelCollection = db.GetCollection<Automovel>("automovel");

                automoveis = automovelCollection.FindAll().ToList();

            }
            return Ok(automoveis);
        }

        [HttpPost]
        public IActionResult Post([FromBody]AddAutomovel request)
        {

            var automovel = new Automovel(request.Nome, request.Marca, request.Porta, request.Placa);

            using (var db = new LiteDatabase("banco.db"))
            {
                var automovelCollection = db.GetCollection<Automovel>("automovel");
                automovelCollection.Insert(automovel);
            }

            return Ok(new { automovel = automovel, Mensagem = "Operação realizada com sucesso!" });
        }

        [HttpPut]
        public IActionResult Atualizar([FromBody]UpdateAutomovel request)
        {
            using (var db = new LiteDatabase("banco.db"))
            {
                var automovelCollection = db.GetCollection<Automovel>("automovel");

                var automovel = automovelCollection.FindOne(x => x.Id == request.Id);

                automovel.Nome = request.Nome;
                automovel.Marca = request.Marca;
                automovel.Porta = request.Porta;
                automovel.Placa = request.Placa;
                automovel.Done = request.Done;

                automovelCollection.Update(automovel);
            }

            return Ok(new { Mensagem = "Operação realizada com sucesso!" });
        }


        [HttpDelete("{id:guid}")]
        public IActionResult Delete(Guid id)
        {
            using (var db = new LiteDatabase("banco.db"))
            {
                var automovelCollection = db.GetCollection<Automovel>("automovel");

                automovelCollection.Delete(id);
            }

            return Ok(new { Mensagem = "Operação realizada com sucesso!" });
        }
    }
}
