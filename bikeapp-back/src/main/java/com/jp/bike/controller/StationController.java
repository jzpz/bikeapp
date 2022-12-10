package com.jp.bike.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jp.bike.model.Station;
import com.jp.bike.repository.StationRepository;

@RestController
public class StationController {
	
	@Autowired
	StationRepository repository;

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/stations")
	public ResponseEntity<List<Station>> getPaginated() {

		List<Station> stations = repository.findAll();
		if(stations.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<Station>>(repository.findAll(), new HttpHeaders(), HttpStatus.OK);
		}
		
	}
}