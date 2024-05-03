using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Dtos;
using AutoMapper;
using Domain.Entities;
using Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;
public class ProductController : BaseController
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public ProductController(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<IEnumerable<ProductDto>>> Get()
    {
        var con = await _unitOfWork.Products.GetAllAsync();

        return _mapper.Map<List<ProductDto>>(con);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ProductDto>> Get(int id){
        var con = await _unitOfWork.Products.GetByIdAsync(id);
        if (con == null){
            return NotFound();
        }
        return _mapper.Map<ProductDto>(con);
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<ProductDto>> Post(ProductDto ProductDto){
        var con = _mapper.Map<Product>(ProductDto);
        _unitOfWork.Products.Add(con);
        await _unitOfWork.SaveAsync();
        if(con == null){
            return BadRequest();
        }
        ProductDto.Id = con.Id;
        return CreatedAtAction(nameof(Post), new {id = ProductDto.Id}, ProductDto);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<ProductDto>> Put(int id, [FromBody]ProductDto ProductDto){
        if(ProductDto.Id == 0){
            ProductDto.Id = id;
        }

        if(ProductDto.Id != id){
            return BadRequest();
        }

        if(ProductDto == null){
            return NotFound();
        }
        var con = _mapper.Map<Product>(ProductDto);
        _unitOfWork.Products.Update(con);
        await _unitOfWork.SaveAsync();
        return ProductDto;
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(int id){
        var con = await _unitOfWork.Products.GetByIdAsync(id);
        if(con == null){
            return NotFound();
        }
        _unitOfWork.Products.Remove(con);
        await _unitOfWork.SaveAsync();
        return NoContent();
    }

}
