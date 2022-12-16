package com.jp.bike.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jp.bike.model.Station;
import com.jp.bike.model.StationPopularity;
import com.jp.bike.repository.JourneyRepository;
import com.jp.bike.repository.StationRepository;

@RestController
public class StationController {
	
	@Autowired
	StationRepository srepository;

	@Autowired
	JourneyRepository jrepository;

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/stations")
	public ResponseEntity<List<Station>> getPaginated() {

		List<Station> stations = srepository.findAll();
		if(stations.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<Station>>(stations, new HttpHeaders(), HttpStatus.OK);
		}
		
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/station/{id}")
	public ResponseEntity<Station> getById(@PathVariable("id") String id) {
		Station station = srepository.findById(id);

		if(station == null) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<Station>(station, new HttpHeaders(), HttpStatus.OK);
		}
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/stationinfo")
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

			journeysStarting = jrepository.countByDepartureStationId(stationId);
			journeysEnding = jrepository.countByReturnStationId(stationId);
			
			averageDistanceCoveredAsDepartureStation = jrepository.averageDistanceCoveredByDepartureStation(stationId);
			averageDistanceCoveredAsReturnStation = jrepository.averageDistanceCoveredByReturnStation(stationId);
			
			mostPopularDepartureStations = jrepository.mostPopularDepartureStations(stationId);
			mostPopularReturnStations = jrepository.mostPopularReturnStations(stationId);

		} else { // Include all stations in search

			// These will be shown as separate values but they will be same if no station is selected.
			Long journeyCount = jrepository.count();
			journeysStarting = journeyCount;
			journeysEnding = journeyCount;

			Long averageDistance = jrepository.averageDistanceCovered();
			averageDistanceCoveredAsDepartureStation = averageDistance;
			averageDistanceCoveredAsReturnStation = averageDistance;

			mostPopularDepartureStations = null;
			mostPopularReturnStations = null;
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