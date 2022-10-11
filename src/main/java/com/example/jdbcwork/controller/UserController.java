package com.example.jdbcwork.controller;

import com.example.jdbcwork.entity.User;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/allUsers")
    public @ResponseBody Object getAllUsers() {
        List<User> userList = jdbcTemplate.query("select * from users", (resultSet, i) -> {
            User user = new User();
            user.setId(resultSet.getInt("id"));
            user.setName(resultSet.getString("name"));
            user.setAge(resultSet.getInt("age"));
            user.setEmail(resultSet.getString("email"));
            user.setPassword(resultSet.getString("password"));
            user.setPhone(resultSet.getString("phone"));
            return user;
        });
        return userList;
    }

    @PostMapping("/addUser")
    public @ResponseBody Object addUser(@RequestBody User user) {
        int rowAffected = jdbcTemplate.update("insert into users(name, age, email, password, phone) values(?, ?, ?, ?, ?)",
                user.getName(), user.getAge(), user.getEmail(), user.getPassword(), user.getPhone());
        return rowAffected;
    }

    @PostMapping("/updateUser")
    public @ResponseBody Object updateUser(@RequestBody User user) {
        int rowAffected = jdbcTemplate.update("update users set name = ?, age = ?, email = ?, password = ?, phone = ? where id = ?",
                user.getName(), user.getAge(), user.getEmail(), user.getPassword(), user.getPhone(), user.getId());
        return rowAffected;
    }

    @PostMapping("/deleteUser")
    public @ResponseBody Object deleteUser(@RequestBody User user) {
        int rowAffected = jdbcTemplate.update("delete from users where id = ?", user.getId());
        return rowAffected;
    }
}
