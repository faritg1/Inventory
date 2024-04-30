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
public class CategoryController : BaseController
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public CategoryController(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<IEnumerable<CategoryDto>>> Get()
    {
        var con = await _unitOfWork.Categories.GetAllAsync();

        return _mapper.Map<List<CategoryDto>>(con);
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<CategoryDto>> Get(int id){
        var con = await _unitOfWork.Categories.GetByIdAsync(id);
        if (con == null){
            return NotFound();
        }
        return _mapper.Map<CategoryDto>(con);
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<CategoryDto>> Post(CategoryDto CategoryDto){
        var con = _mapper.Map<Category>(CategoryDto);
        _unitOfWork.Categories.Add(con);
        await _unitOfWork.SaveAsync();
        if(con == null){
            return BadRequest();
        }
        CategoryDto.Id = con.Id;
        return CreatedAtAction(nameof(Post), new {id = CategoryDto.Id}, CategoryDto);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<CategoryDto>> Put(int id, [FromBody]CategoryDto CategoryDto){
        if(CategoryDto.Id == 0){
            CategoryDto.Id = id;
        }

        if(CategoryDto.Id != id){
            return BadRequest();
        }

        if(CategoryDto == null){
            return NotFound();
        }
        var con = _mapper.Map<Category>(CategoryDto);
        _unitOfWork.Categories.Update(con);
        await _unitOfWork.SaveAsync();
        return CategoryDto;
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(int id){
        var con = await _unitOfWork.Categories.GetByIdAsync(id);
        if(con == null){
            return NotFound();
        }
        _unitOfWork.Categories.Remove(con);
        await _unitOfWork.SaveAsync();
        return NoContent();
    }

}
