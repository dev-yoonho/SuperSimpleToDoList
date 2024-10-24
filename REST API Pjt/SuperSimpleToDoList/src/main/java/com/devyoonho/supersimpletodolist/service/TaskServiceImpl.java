package com.devyoonho.supersimpletodolist.service;

import com.devyoonho.supersimpletodolist.dao.TaskDao;
import com.devyoonho.supersimpletodolist.dto.Task;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskDao taskDao;

    public TaskServiceImpl(TaskDao taskDao) {
        this.taskDao = taskDao;
    }
    
    // 할 일 전체 조회
    @Override
    public List<Task> getAllTasks() {
        return taskDao.selectAll();
    }
    
    // 할 일 개별 조회
    @Override
    public Task getTask(int id) {
        return taskDao.selectById(id);
    }

    // 할 일 등록
    @Override
    public void addTask(Task task) {
        taskDao.insertTask(task);
    }

    // 할 일 수정
    @Override
    public void editTask(Task task) {
        taskDao.updateTask(task);
    }

    // 할 일 삭제
    @Override
    public void removeTask(int id) {
        taskDao.deleteTask(id);
    }
}
