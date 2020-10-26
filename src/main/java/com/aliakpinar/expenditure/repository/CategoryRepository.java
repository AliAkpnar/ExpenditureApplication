package com.aliakpinar.expenditure.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aliakpinar.expenditure.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long>{
	Category findByName(String name);
}