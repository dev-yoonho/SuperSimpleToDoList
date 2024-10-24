package com.devyoonho.supersimpletodolist.service;

import com.devyoonho.supersimpletodolist.dto.Task;

import java.util.List;

public interface TaskService {
    // 할 일 전체 조회
    List<Task> getAllTasks();

    // 할 일 개별 조회
    Task getTask(int id);

    // 할 일 등록
    void addTask(Task task);

    // 할 일 수정
    void editTask(Task task);

    // 할 일 삭제
    void removeTask(int id);
}
