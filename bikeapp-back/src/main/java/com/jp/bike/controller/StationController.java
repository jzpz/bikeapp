package com.jp.bike.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
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

	// Returns list of stations
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/stations")
	public ResponseEntity<List<Station>> getAll() {

		List<Station> stations = srepository.findAll();
		if(stations.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<List<Station>>(stations, new HttpHeaders(), HttpStatus.OK);
		}
		
	}

	// Returns a single station
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

	// Returns information about station - most popular departures/returns, average journeys, journey count
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/stationinfo")
	public ResponseEntity<HashMap<String, Object>> getInfo(
		@RequestParam(name="stationId", required=false) String stationId,
		@RequestParam(name="dateFrom", required=false) String strDateFrom, // Strings will be parsed
		@RequestParam(name="dateTo", required=false) String strDateTo) { // as LocalDate yyyy-MM-dd

		HashMap<String, Object> values = new HashMap<String, Object>();
		
		Long journeysStarting;
		Long journeysEnding;
		Long averageDistanceCoveredAsReturnStation;
		Long averageDistanceCoveredAsDepartureStation;
		List<StationPopularity> mostPopularDepartureStations;
		List<StationPopularity> mostPopularReturnStations;
		
		if(stationId != null) { // Search using station id

			// Both start and end dates are required in order to query by date
			if(strDateFrom != null && strDateTo != null) {
				try {
					LocalDateTime dateFrom = LocalDate.parse(strDateFrom).atStartOfDay();
					LocalDateTime dateTo = LocalDate.parse(strDateTo).atTime(LocalTime.MAX);
					
					journeysStarting = jrepository.
						countByDepartureStationIdAndDepartureDateGreaterThanEqualAndReturnDateLessThanEqual(
							stationId, dateFrom, dateTo);
					journeysEnding = jrepository.
						countByReturnStationIdAndDepartureDateGreaterThanEqualAndReturnDateLessThanEqual(
							stationId, dateFrom, dateTo);
					averageDistanceCoveredAsDepartureStation = jrepository.
						averageDistanceCoveredByDepartureStationIdAndDepartureDateGreaterThanEqualAndReturnDateLessThanEqual(
							stationId, dateFrom, dateTo);
					averageDistanceCoveredAsReturnStation = jrepository.
						averageDistanceCoveredByReturnStationIdAndDepartureDateGreaterThanEqualAndReturnDateLessThanEqual(
							stationId, dateFrom, dateTo);
				} catch (Exception e) {
					System.out.println("Invalid date specified. " + e);
					return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
				}
			} else {
				journeysStarting = jrepository.countByDepartureStationId(stationId);
				journeysEnding = jrepository.countByReturnStationId(stationId);
				averageDistanceCoveredAsDepartureStation = jrepository.averageDistanceCoveredByDepartureStation(stationId);
				averageDistanceCoveredAsReturnStation = jrepository.averageDistanceCoveredByReturnStation(stationId);
			}
			
			mostPopularDepartureStations = srepository.mostPopularDepartureStations(stationId);
			mostPopularReturnStations = srepository.mostPopularReturnStations(stationId);

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