using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    public class ExpenseController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/Expense
        public System.Object GetExpenses()
        {
            var result = (from e in db.Expenses
                          join o in db.Owners
                          on e.OwnerID equals o.OwnerID

                          select new
                          {
                              e.ExpenseID,
                              Owner = o.Name,
                              e.Name,
                              e.TotalAmount,

                          }).ToList();

            return result;
        }

        // GET: api/Expense/5
        [ResponseType(typeof(Expense))]
        public IHttpActionResult GetExpense(long id)
        {
            var expense = (from e in db.Expenses
                           where e.ExpenseID == id

                           select new
                           {
                               e.ExpenseID,
                               e.OwnerID,
                               e.Name,
                               e.TotalAmount,
                               DeletedExpenseItemIDs = ""
                           }).FirstOrDefault();

            var expenseItems = (from e in db.ExpenseItems
                                join c in db.Categories
                                on e.CategoryID equals c.CategoryID
                                where e.ExpenseID == id

                                select new
                                {
                                    e.ExpenseID,
                                    e.ExpenseItemID,
                                    e.CategoryID,
                                    e.Name,
                                    e.Amount,
                                    CategoryName = c.Name
                                }).ToList();

            return Ok(new { expense, expenseItems });
        }

        // PUT: api/Expense/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutExpense(long id, Expense expense)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != expense.ExpenseID)
            {
                return BadRequest();
            }

            db.Entry(expense).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExpenseExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Expense
        [ResponseType(typeof(Expense))]
        public IHttpActionResult PostExpense(Expense expense)
        {
            try
            {
                // Expense table
                if (expense.ExpenseID == 0)
                {
                    db.Expenses.Add(expense);
                } else
                {
                    db.Entry(expense).State = EntityState.Modified;
                }

                // ExpenseItems table
                foreach (var item in expense.ExpenseItems)
                {
                    if (item.ExpenseItemID == 0)
                    {
                        db.ExpenseItems.Add(item);
                    }
                    else
                    {
                        db.Entry(item).State = EntityState.Modified;
                    }
                }

                // Deleted items in edit method
                foreach (var id in expense.DeletedExpenseItemIDs.Split(',').Where(x => x != ""))
                {
                    ExpenseItem x = db.ExpenseItems.Find(Convert.ToInt64(id));
                    db.ExpenseItems.Remove(x);
                }

                db.SaveChanges();

                return Ok();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        // DELETE: api/Expense/5
        [ResponseType(typeof(Expense))]
        public IHttpActionResult DeleteExpense(long id)
        {
            Expense expense = db.Expenses.Include(y => y.ExpenseItems)
                .SingleOrDefault(x => x.ExpenseID == id);

            foreach (var item in expense.ExpenseItems.ToList())
            {
                db.ExpenseItems.Remove(item);
            }

            db.Expenses.Remove(expense);
            db.SaveChanges();

            return Ok(expense);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ExpenseExists(long id)
        {
            return db.Expenses.Count(e => e.ExpenseID == id) > 0;
        }
    }
}