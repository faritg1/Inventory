using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Data.Configuration
{
    public class EmailConfiguration : IEntityTypeConfiguration<Email>
    {
        public void Configure(EntityTypeBuilder<Email> entity)
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("email");

            entity.Property(e => e.Para)
                .IsRequired()
                .HasMaxLength(50);

            entity.Property(e => e.Asunto)
                .IsRequired()
                .HasMaxLength(200);

            entity.Property(e => e.Contenido)
                .IsRequired()
                .HasMaxLength(200);
        }
    }
}
