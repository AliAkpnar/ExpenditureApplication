package com.aliakpinar.expenditure.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.aliakpinar.expenditure.entity.Expenditure;

public interface ExpenditureRepository extends JpaRepository<Expenditure, Long> {

}
