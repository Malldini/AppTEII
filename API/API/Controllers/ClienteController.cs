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
    [Route("api/cliente")]
    public class ClienteController : Controller
    {
        //[HttpGet]
        //public string Get()
        //{
        //    return "API versão 1.0";
        //}


        [HttpGet]
        //[Route("api/todo/Listar")]
        public IActionResult ListarCliente()
        {
            List<Cliente> clientes;

            using (var db = new LiteDatabase("banco.db"))
            {
                var clienteCollection = db.GetCollection<Cliente>("cliente");

                clientes = clienteCollection.FindAll().ToList();

            }
            return Ok(clientes);
        }

        [HttpPost]
        public IActionResult Post([FromBody]AddCliente request)
        {

            var cliente = new Cliente(request.Nome, request.Telefone, request.CPF);
            
            using (var db = new LiteDatabase("banco.db"))
            {
                var clienteCollection = db.GetCollection<Cliente>("cliente");
                clienteCollection.Insert(cliente);
            }

            return Ok(new { Cliente = cliente, Mensagem = "Operação realizada com sucesso!" });
        }

        [HttpPut]
        public IActionResult Atualizar([FromBody]UpdateCliente request)
        {
            using (var db = new LiteDatabase("banco.db"))
            {
                var clienteCollection = db.GetCollection<Cliente>("cliente");

                var cliente = clienteCollection.FindOne(x => x.Id == request.Id);

                cliente.Nome = request.Nome;
                cliente.Telefone = request.Telefone;
                cliente.CPF = request.CPF;
                cliente.Done = request.Done;

                clienteCollection.Update(cliente);
            }

            return Ok(new { Mensagem = "Operação realizada com sucesso!" });
        }


        [HttpDelete("{id:guid}")]
        public IActionResult Delete(Guid id)
        {
            using (var db = new LiteDatabase("banco.db"))
            {
                var clienteCollection = db.GetCollection<Cliente>("cliente");

                clienteCollection.Delete(id);
            }

            return Ok(new { Mensagem = "Operação realizada com sucesso!" });
        }
    }
}
