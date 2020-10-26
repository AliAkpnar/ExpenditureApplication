package com.aliakpinar.expenditure.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aliakpinar.expenditure.entity.Category;
import com.aliakpinar.expenditure.repository.CategoryRepository;

@RestController
@RequestMapping("/v1")
public class CategoryController {
	
	private final CategoryRepository categoryRepository;

	public CategoryController(CategoryRepository categoryRepository) {
		this.categoryRepository = categoryRepository;
		
	}
	
	@GetMapping("/categories")
	public ResponseEntity<Collection<Category>> categories(){
		return ResponseEntity.ok(categoryRepository.findAll());
	}
	
	@GetMapping("category/{id}")
	public ResponseEntity<?> getCategory(@PathVariable("id") Long id){
		Optional<Category> category = categoryRepository.findById(id);
		return category.map(response -> ResponseEntity.ok(response)).orElse(new ResponseEntity<Category>(HttpStatus.NOT_FOUND));
	}
	
	 @PostMapping("/category")
	 public ResponseEntity<Category> createCategory(@Valid @RequestBody Category theCategory) throws URISyntaxException {
		 Category result = categoryRepository.save(theCategory);
		 return ResponseEntity.created(new URI("/v1/category" + result.getId())).body(result);
	 }
	 
	 @PutMapping("/category/{id}")
	 public ResponseEntity<Category> updateCategory(@Valid @RequestBody Category category){
		 Category result = categoryRepository.save(category);
		 return ResponseEntity.ok().body(result);
	 }
	 
	 @DeleteMapping("/category/{id}")
	 public ResponseEntity<?> deleteCategory(@PathVariable("id") Long id){
		 
		 
		 try {
			 categoryRepository.deleteById(id);
			 return ResponseEntity.ok().build();
			
		} catch (Exception e) {
			throw new RuntimeException("Id not found: " +id);
		}

	 }
}
