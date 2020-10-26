package com.aliakpinar.expenditure.entity;

import java.util.Set;

import javax.persistence.Entity;

import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "user")
public class User {
	
	@Id
	private Long id;
	
	private String name;
	
	private String email;
	
	

}
