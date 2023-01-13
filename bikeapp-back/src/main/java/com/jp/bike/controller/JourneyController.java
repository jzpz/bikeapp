package com.jp.bike.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
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
import com.jp.bike.repository.JourneyRepository;

@RestController
public class JourneyController {
	
	@Autowired
	JourneyRepository repository;

	// Returns paginated list of journeys
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/journeys")
	public ResponseEntity<List<Journey>> getPaginated(
			@RequestParam(defaultValue = "0") Integer page, 
			@RequestParam(defaultValue = "20") Integer size,
			@RequestParam(defaultValue = "id") String sortBy,
			@RequestParam(defaultValue = "false") Boolean descending,
			@RequestParam(name="departureStationId", required=false) String departureStationId,
			@RequestParam(name="returnStationId", required=false) String returnStationId,
			@RequestParam(name="dateFrom", required=false) String strDateFrom, // Strings will be parsed
			@RequestParam(name="dateTo", required=false) String strDateTo) { // as LocalDate yyyy-MM-dd
		
		if(size > 100) {
			size = 100; // Keep the max page size at 100
		}

		if(sortBy == null) {
			sortBy = "departureDate";
		}

		Page<Journey> journeys;
		Pageable pageRequest = PageRequest.of(page, size, Sort.by(sortBy).descending());
		
		if(descending == true) {
			pageRequest = PageRequest.of(page, size, Sort.by(sortBy));
		}

		// Both start and end dates are required in order to query by date
		if(strDateFrom != null && strDateTo != null) {

			try {
				LocalDateTime dateFrom = LocalDate.parse(strDateFrom).atStartOfDay();
				LocalDateTime dateTo = LocalDate.parse(strDateTo).atTime(LocalTime.MAX);

				if(departureStationId != null && returnStationId != null) {
					journeys = repository.
						findByDepartureStationIdAndReturnStationIdAndDepartureDateGreaterThanEqualAndReturnDateLessThanEqual(
							departureStationId, returnStationId, dateFrom, dateTo, pageRequest);
				} else if(departureStationId != null) {
					journeys = repository.
						findByDepartureStationIdAndDepartureDateGreaterThanEqualAndReturnDateLessThanEqual(
							departureStationId, dateFrom, dateTo, pageRequest);
				} else if(returnStationId != null) {
					journeys = repository.
						findByReturnStationIdAndDepartureDateGreaterThanEqualAndReturnDateLessThanEqual(
							returnStationId, dateFrom, dateTo, pageRequest);
				} else {
					journeys = repository.
						findByDepartureDateGreaterThanEqualAndReturnDateLessThanEqual(
							dateFrom, dateTo, pageRequest);
				}
			} catch (Exception e) {
				System.out.println("Invalid date specified. " + e);
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}

		} else {

			if(departureStationId != null && returnStationId != null) {
				journeys = repository.findByDepartureStationIdAndReturnStationId(
					departureStationId, returnStationId, pageRequest);
			} else if(departureStationId != null) {
				journeys = repository.findByDepartureStationId(departureStationId, pageRequest);
			} else if(returnStationId != null) {
				journeys = repository.findByReturnStationId(returnStationId, pageRequest);
			} else {
				journeys = repository.findAll(pageRequest);
			}

		}

		if(journeys.hasContent())
			return new ResponseEntity<List<Journey>>(journeys.getContent(), new HttpHeaders(), HttpStatus.OK);
		
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/journey/{id}")
	public ResponseEntity<Journey> getById(@PathVariable("id") Integer id) {
		Journey journey = repository.findById(id);

		if(journey == null)
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);

		return new ResponseEntity<Journey>(journey, new HttpHeaders(), HttpStatus.OK);
	}

}