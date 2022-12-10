package com.jp.bike.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jp.bike.model.Journey;
import com.jp.bike.repository.JourneyRepository;

@RestController
public class JourneyController {
	
	@Autowired
	JourneyRepository repository;

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/journeys")
	public ResponseEntity<List<Journey>> getPaginated(
			@RequestParam(defaultValue = "0") Integer page, 
			@RequestParam(defaultValue = "20") Integer size,
			@RequestParam(defaultValue = "id") String sortBy,
			@RequestParam(defaultValue = "false") Boolean descending) {
		
		if(size > 100) size = 100; // Keep the max page size at 100

		Pageable pageRequest = PageRequest.of(page, size, Sort.by(sortBy));
		
		if(descending == true) {
			pageRequest = PageRequest.of(page, size, Sort.by(sortBy).descending());
		}

		Page<Journey> journeys = repository.findAll(pageRequest);

		if(journeys.hasContent()) {
			return new ResponseEntity<List<Journey>>(journeys.getContent(), new HttpHeaders(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		
	}
}