package com.devyoonho.supersimpletodolist.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class Task {
    private int taskId;
    @NonNull
    private String userId;
    @NonNull
    private String title;
    @NonNull
    private String priority;
    private Date createdAt;
    @NonNull
    private String status;
}
