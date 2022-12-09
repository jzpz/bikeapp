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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jp.bike.model.Station;
import com.jp.bike.repository.StationRepository;

@RestController
public class StationController {
	
	@Autowired
	StationRepository repository;

	@GetMapping("/stations")
	public ResponseEntity<List<Station>> getPaginated(
			@RequestParam(defaultValue = "0") Integer page, 
			@RequestParam(defaultValue = "20") Integer size,
			@RequestParam(defaultValue = "fid") String sortBy,
			@RequestParam(defaultValue = "false") Boolean descending) {
		 
		Pageable pageRequest = PageRequest.of(page, size, Sort.by(sortBy));
		
		if(descending == true) {
			pageRequest = PageRequest.of(page, size, Sort.by(sortBy).descending());
		}
		
		Page<Station> stations = repository.findAll(pageRequest);

		if(stations.hasContent()) {
			return new ResponseEntity<List<Station>>(stations.getContent(), new HttpHeaders(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		
	}
}