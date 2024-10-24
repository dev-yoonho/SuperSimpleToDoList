package com.devyoonho.supersimpletodolist.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@MapperScan(basePackages = "com.devyoonho.supersimpletodolist.dao")
public class DBConfig {
}
