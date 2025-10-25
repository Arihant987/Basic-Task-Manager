using Microsoft.AspNetCore.Mvc;
using BasicTaskManager.Models;

namespace BasicTaskManager.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        // In-memory storage
        private static readonly List<TaskItem> _tasks = new();

        // GET: api/tasks
        [HttpGet]
        public ActionResult<IEnumerable<TaskItem>> GetTasks()
        {
            return Ok(_tasks);
        }

        // POST: api/tasks
        [HttpPost]
        public ActionResult<TaskItem> AddTask([FromBody] TaskItem newTask)
        {
            if (string.IsNullOrWhiteSpace(newTask.Description))
                return BadRequest("Description cannot be empty");

            newTask.Id = Guid.NewGuid();
            _tasks.Add(newTask);
            return CreatedAtAction(nameof(GetTasks), new { id = newTask.Id }, newTask);
        }

        // PUT: api/tasks/{id}
        [HttpPut("{id}")]
        public ActionResult UpdateTask(Guid id, [FromBody] TaskItem updatedTask)
        {
            var existingTask = _tasks.FirstOrDefault(t => t.Id == id);
            if (existingTask == null)
                return NotFound();

            existingTask.Description = updatedTask.Description;
            existingTask.IsCompleted = updatedTask.IsCompleted;
            return NoContent();
        }

        // DELETE: api/tasks/{id}
        [HttpDelete("{id}")]
        public ActionResult DeleteTask(Guid id)
        {
            var task = _tasks.FirstOrDefault(t => t.Id == id);
            if (task == null)
                return NotFound();

            _tasks.Remove(task);
            return NoContent();
        }
    }
}
