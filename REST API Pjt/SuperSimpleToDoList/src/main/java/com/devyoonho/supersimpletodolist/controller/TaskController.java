package com.devyoonho.supersimpletodolist.controller;

import com.devyoonho.supersimpletodolist.dto.Task;
import com.devyoonho.supersimpletodolist.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todo")
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    // 할 일 목록 조회
    // GET /todo
    @GetMapping("")
    public ResponseEntity<List<Task>> todolist(){
        List<Task> tasks = taskService.getAllTasks();
        return ResponseEntity.ok(tasks);
    }

    // 할 일 개별 조회
    // GET /todo/{id}
    @GetMapping("/{id}")
    public ResponseEntity<?> detail(@PathVariable int id){
        Task task = taskService.getTask(id);

        if (task == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Task not found");
        }

        return ResponseEntity.ok(task);
    }

    // 할 일 등록
    // POST /todo
    @PostMapping("")
    public ResponseEntity<Task> register(@RequestBody Task task) {
        try {
            taskService.addTask(task);
            return ResponseEntity.status(HttpStatus.CREATED).body(task);
        } catch (Exception e) {
            //noinspection CallToPrintStackTrace
            e.printStackTrace();
            return ResponseEntity.badRequest().body(null);
        }
    }

    // 할 일 수정
    // PUT /todo/{id}
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable int id, @RequestBody Task task) {
        if (task.getTaskId() != id) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Task ID in path and request body do not match");
        }

        try {
            taskService.editTask(task);
            return ResponseEntity.status(HttpStatus.OK).body(task);
        } catch (Exception e) {
            //noinspection CallToPrintStackTrace
            e.printStackTrace();
            return ResponseEntity.badRequest().body(null);
        }
    }

    // 할 일 삭제
    // DELETE /todo/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable int id) {
        try {
            taskService.removeTask(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            //noinspection CallToPrintStackTrace
            e.printStackTrace();
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
