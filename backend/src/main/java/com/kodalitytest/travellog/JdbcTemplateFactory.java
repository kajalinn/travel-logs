package com.kodalitytest.travellog;

import io.micronaut.context.annotation.Bean;
import io.micronaut.context.annotation.Factory;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.sql.DataSource; //Represents a database connection source

@Factory //The @Factory annotation marks this class as a factory, indicating that it will create and configure beans.
public class JdbcTemplateFactory {

    @Bean //This method creates and configures a bean.
    public JdbcTemplate jdbcTemplate(DataSource dataSource) {
        return new JdbcTemplate(dataSource); //returns a new instance of JdbcTemplate
    }
}
