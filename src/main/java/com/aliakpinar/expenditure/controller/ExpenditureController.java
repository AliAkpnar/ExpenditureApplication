package com.aliakpinar.expenditure.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aliakpinar.expenditure.entity.Expenditure;
import com.aliakpinar.expenditure.repository.ExpenditureRepository;

@RestController
@RequestMapping("/v1")
public class ExpenditureController {
	
	@Autowired
	private ExpenditureRepository expenditureRepository;
	
	@GetMapping("/expenditures")
	List<Expenditure> getExpenditure(){
		return expenditureRepository.findAll();
	}
	
	@DeleteMapping("/expenditures/{id}")
	ResponseEntity<?> deleteExpenditure(@PathVariable("id") Long id){
		expenditureRepository.deleteById(id);
		return ResponseEntity.ok().build();
	}
	
	@PostMapping("/expenditures")
	ResponseEntity<Expenditure> createExpenditure(@Valid @RequestBody Expenditure expenditure) throws URISyntaxException{
		Expenditure result = expenditureRepository.save(expenditure);
		return ResponseEntity.created(new URI("/v1/expenditures" + result.getId())).body(result);
	}

}
