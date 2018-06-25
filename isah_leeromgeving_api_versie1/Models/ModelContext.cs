using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace isah_leeromgeving_api_versie1.Models
{
    public class ModelContext : DbContext
    {
        public ModelContext(DbContextOptions<ModelContext> options): base(options)
        {

        }

        public virtual DbSet<Choice> Choices { get; set; }
        public virtual DbSet<Company> Companies { get; set; }
        public virtual DbSet<Course> Courses { get; set; }
        public virtual DbSet<Diagram> Diagrams { get; set; }
        public virtual DbSet<Function> Functions { get; set; }
        public virtual DbSet<Module> Modules { get; set; }
        public virtual DbSet<Path> Paths { get; set; }
        public virtual DbSet<Position> Positions { get; set; }
        public virtual DbSet<Question> Questions { get; set; }
        public virtual DbSet<Rectangle> Rectangles { get; set; }
        public virtual DbSet<Slide> Slides { get; set; }
        public virtual DbSet<Text> Texts { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //set foreignkeys
            /*modelBuilder.Entity<Path>()
                .HasOne(path => path.Diagram)
                .WithMany(diagram => diagram.Paths)
                .HasForeignKey(path => path.Iddiagram);*/

            //modelBuilder.Entity<Position>()
             //.Ignore(p => p.Idpath);

            //set primarykeys
            //rectangle connections
            modelBuilder.Entity<Rectangle>()
                .HasKey(rectangle => new { rectangle.Iddiagram, rectangle.Rectanglecode });

            //text connections
            modelBuilder.Entity<Text>()
                .HasKey(text => new { text.Iddiagram, text.Textcode });

            //
            modelBuilder.Entity<Slidediagram>()
                .HasKey(slidediagram => new { slidediagram.Iddiagram, slidediagram.Idslide });

            modelBuilder.Entity<Slidediagram>()
                .HasOne(sd => sd.Slide)
                .WithMany(s => s.Slidediagrams)
                .HasForeignKey(sd => sd.Idslide);

            modelBuilder.Entity<Slidediagram>()
                .HasOne(sd => sd.Diagram)
                .WithMany(d => d.Slidediagrams)
                .HasForeignKey(sd => sd.Iddiagram);

            modelBuilder.Entity<Coursemodule>().HasKey(coursemodule => new { coursemodule.Idcourse, coursemodule.Idmodule });

            /*
            modelBuilder.Entity<Coursemodule>()
                .HasOne(cm => cm.Course)
                .WithMany(c => c.Coursemodules)
                .HasForeignKey(cm => cm.Idcourse);

            modelBuilder.Entity<Coursemodule>()
                 .HasOne(cm => cm.Module)
                 .WithMany(m => m.Coursemodules)
                 .HasForeignKey(cm => cm.Idmodule);*/

            /*
            modelBuilder.Entity<Company>()
               .HasMany(e => e.Users)
               .WithOptional(e => e.Company)
               .HasForeignKey(e => e.Companyname);

            modelBuilder.Entity<Company>()
                .HasMany(e => e.Users1)
                .WithOptional(e => e.Company1)
                .HasForeignKey(e => e.Companyname);

            modelBuilder.Entity<Company>()
                .HasMany(e => e.Users2)
                .WithOptional(e => e.Company2)
                .HasForeignKey(e => e.Companyname);

            modelBuilder.Entity<Course>()
                .Property(e => e.Days)
                .HasPrecision(2, 0);

            modelBuilder.Entity<Course>()
                .HasMany(e => e.Modules)
                .WithMany(e => e.Courses)
                .Map(m => m.ToTable("Coursemodule").MapLeftKey("Idcourse").MapRightKey("Idmodule"));

            modelBuilder.Entity<Diagram>()
                .HasMany(e => e.Paths)
                .WithRequired(e => e.Diagram)
                .HasForeignKey(e => e.Iddiagram)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Diagram>()
                .HasMany(e => e.Rectangles)
                .WithRequired(e => e.Diagram)
                .HasForeignKey(e => e.Iddiagram)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Diagram>()
                .HasMany(e => e.Texts)
                .WithRequired(e => e.Diagram)
                .HasForeignKey(e => e.Iddiagram)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Diagram>()
                .HasMany(e => e.Slides)
                .WithMany(e => e.Diagrams)
                .Map(m => m.ToTable("Slidediagram").MapLeftKey("Iddiagram").MapRightKey("Idslide"));

            modelBuilder.Entity<Function>()
                .HasMany(e => e.Functions1)
                .WithOptional(e => e.Function1)
                .HasForeignKey(e => e.Idfunction);

            modelBuilder.Entity<Function>()
                .HasMany(e => e.Slides)
                .WithRequired(e => e.Function)
                .HasForeignKey(e => e.Idfunction)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Module>()
                .HasMany(e => e.Slides)
                .WithRequired(e => e.Module)
                .HasForeignKey(e => e.Idmodule)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Path>()
                .HasMany(e => e.Positions)
                .WithRequired(e => e.Path)
                .HasForeignKey(e => e.Idpath)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Position>()
                .Property(e => e.X)
                .HasPrecision(4, 0);

            modelBuilder.Entity<Position>()
                .Property(e => e.Y)
                .HasPrecision(4, 0);

            modelBuilder.Entity<Position>()
                .Property(e => e.Nr)
                .HasPrecision(3, 0);

            modelBuilder.Entity<Question>()
                .HasMany(e => e.Choices)
                .WithRequired(e => e.Question)
                .HasForeignKey(e => e.Idquestion)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Rectangle>()
                .Property(e => e.Width)
                .HasPrecision(4, 0);

            modelBuilder.Entity<Rectangle>()
                .Property(e => e.Height)
                .HasPrecision(4, 0);

            modelBuilder.Entity<Slide>()
                .Property(e => e.index)
                .HasPrecision(3, 0);

            modelBuilder.Entity<Text>()
                .Property(e => e.Width)
                .HasPrecision(4, 0);

            modelBuilder.Entity<Text>()
                .Property(e => e.Height)
                .HasPrecision(4, 0);*/
        }
    }
}
