package com.devyoonho.supersimpletodolist.dao;

import com.devyoonho.supersimpletodolist.dto.Task;

import java.util.List;

public interface TaskDao {

    // 할 일 전체 조회
    List<Task> selectAll();

    // 할 일 개별 조회(Id로)
    Task selectById(int id);

    // 할 일 등록
    void insertTask(Task task);

    // 할 일 수정
    void updateTask(Task task);

    // 할 일 삭제
    void deleteTask(int id);

}
