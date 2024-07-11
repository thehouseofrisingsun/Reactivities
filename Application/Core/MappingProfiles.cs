using Application.Activities;
using AutoMapper;
using Domain;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Activity, Activity>();
    }
}