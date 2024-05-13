using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Dtos;
using AutoMapper;
using Domain.Entities;

namespace Api.Profiles
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles(){
            CreateMap<Category, CategoryDto>().ReverseMap();
            CreateMap<Category, CategoryGetFullDto>().ReverseMap();
            CreateMap<Product, ProductDto>().ReverseMap();
        }
    }
}