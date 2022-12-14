package com.jp.bike.controller;

import java.util.HashMap;
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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jp.bike.model.Journey;
import com.jp.bike.model.StationPopularity;
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
			@RequestParam(defaultValue = "false") Boolean descending,
			@RequestParam(name="departureStationId", required=false) String departureStationId,
			@RequestParam(name="returnStationId", required=false) String returnStationId) {
		
		if(size > 100) size = 100; // Keep the max page size at 100

		Pageable pageRequest = PageRequest.of(page, size, Sort.by(sortBy));
		
		if(descending == true) {
			pageRequest = PageRequest.of(page, size, Sort.by(sortBy).descending());
		}

		Page<Journey> journeys;

		// Search journeys by departure or return station
		if(departureStationId != null && returnStationId != null) {
			journeys = repository.findByDepartureStationIdAndReturnStationId(departureStationId, returnStationId, pageRequest);
		} else if(departureStationId != null) {
			journeys = repository.findByDepartureStationId(departureStationId, pageRequest);
		} else if(returnStationId != null) {
			journeys = repository.findByReturnStationId(returnStationId, pageRequest);
		} else {
			journeys = repository.findAll(pageRequest);
		}

		if(journeys.hasContent())
			return new ResponseEntity<List<Journey>>(journeys.getContent(), new HttpHeaders(), HttpStatus.OK);
		
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/journey1")
	Page<Journey> get() {
		Pageable pageRequest = PageRequest.of(1, 25);
		return repository.findAll(pageRequest);
	}
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/journey/{id}")
	public ResponseEntity<Journey> getById(@PathVariable("id") Integer id) {
		Journey journey = repository.findById(id);

		if(journey == null)
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);

		return new ResponseEntity<Journey>(journey, new HttpHeaders(), HttpStatus.OK);
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/journeyinfo")
	public ResponseEntity<HashMap<String, Object>> getInfo(
		@RequestParam(name="stationId", required=false) String stationId) {

		HashMap<String, Object> values = new HashMap<String, Object>();
		
		Long journeysStarting;
		Long journeysEnding;
		Long averageDistanceCoveredAsReturnStation;
		Long averageDistanceCoveredAsDepartureStation;
		List<StationPopularity> mostPopularDepartureStations;
		List<StationPopularity> mostPopularReturnStations;

		if(stationId != null) { // Search using station id

			journeysStarting = repository.countByDepartureStationId(stationId);
			journeysEnding = repository.countByReturnStationId(stationId);
			
			averageDistanceCoveredAsDepartureStation = repository.averageDistanceCoveredByDepartureStation(stationId);
			averageDistanceCoveredAsReturnStation = repository.averageDistanceCoveredByReturnStation(stationId);
			
			mostPopularDepartureStations = repository.mostPopularDepartureStations(stationId);
			mostPopularReturnStations = repository.mostPopularReturnStations(stationId);

		} else { // Include all stations in search

			// These will be shown as separate values but they will be same if no station is selected.
			Long journeyCount = repository.count();
			journeysStarting = journeyCount;
			journeysEnding = journeyCount;

			Long averageDistance = repository.averageDistanceCovered();
			averageDistanceCoveredAsDepartureStation = averageDistance;
			averageDistanceCoveredAsReturnStation = averageDistance;

			List<StationPopularity> popularStations = repository.mostPopularStations();
			mostPopularDepartureStations = popularStations;
			mostPopularReturnStations = popularStations;
		}

		values.put("journeysStarting", journeysStarting);
		values.put("journeysEnding", journeysEnding);
		values.put("averageDistanceCoveredAsDepartureStation", averageDistanceCoveredAsDepartureStation);
		values.put("averageDistanceCoveredAsReturnStation", averageDistanceCoveredAsReturnStation);
		values.put("mostPopularDepartureStations", mostPopularDepartureStations);
		values.put("mostPopularReturnStations", mostPopularReturnStations);

		return new ResponseEntity<HashMap<String, Object>>(values, new HttpHeaders(), HttpStatus.OK);
	}

}