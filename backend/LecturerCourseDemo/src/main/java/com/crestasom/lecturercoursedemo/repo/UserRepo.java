package com.crestasom.lecturercoursedemo.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crestasom.lecturercoursedemo.model.User;

public interface UserRepo extends JpaRepository<User, Integer> {
	Optional<User> findByUsername(String userName);
}
