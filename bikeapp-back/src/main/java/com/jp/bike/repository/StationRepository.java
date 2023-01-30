package com.jp.bike.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.jp.bike.model.Station;
import com.jp.bike.model.StationPopularity;

public interface StationRepository extends JpaRepository<Station, Integer> {
	Station findById(String id);

	/* 
		Queries that return 5 of the most popular departure/return stations
		Includes relevant information from Station and Journey tables
		(translated names, amount of departures/returns, station id)
	*/
	
	// Query first part
	String stationPopularityDefaultColumns = 
		"SELECT new com.jp.bike.model.StationPopularity( " +
			"s.id, " +
			"s.nameLocaleFi, " +
			"s.nameLocaleSe, " +
			"s.nameLocaleEn, ";


	// Returns the most popular return stations for a departure station
	String returnStationPopularityQuery = 
		"COUNT(j.returnStationId) AS journeyAmount) FROM Journey j " +
		"INNER JOIN Station s ON j.returnStationId = s.id " + 
		"WHERE j.departureStationId = ?1 ";
	
	String returnStationPopularityQueryOptions =
		"GROUP BY j.returnStationId ORDER BY journeyAmount DESC LIMIT 5";

	@Query(stationPopularityDefaultColumns 
		+ returnStationPopularityQuery 
		+ returnStationPopularityQueryOptions)
	List<StationPopularity> mostPopularReturnStations(String departureStationId);

	@Query(stationPopularityDefaultColumns 
		+ returnStationPopularityQuery 
		+ "AND j.departureDate >= ?2 AND j.returnDate <= ?3 "
		+ returnStationPopularityQueryOptions)
	List<StationPopularity> mostPopularReturnStationsByDate(String departureStationId, LocalDateTime dateFrom, LocalDateTime dateTo);


	// Returns the most popular departure stations for a return station
	String departureStationPopularityQuery = 
		"COUNT(j.departureStationId) AS journeyAmount) FROM Journey j " +
		"INNER JOIN Station s ON j.departureStationId = s.id " +
		"WHERE j.returnStationId = ?1 ";
	
	String departureStationPopularityQueryOptions =
		"GROUP BY j.departureStationId ORDER BY journeyAmount DESC LIMIT 5";

	@Query(stationPopularityDefaultColumns 
		+ departureStationPopularityQuery 
		+ departureStationPopularityQueryOptions)
	List<StationPopularity> mostPopularDepartureStations(String returnStationId);

	@Query(stationPopularityDefaultColumns 
		+ departureStationPopularityQuery 
		+ "AND j.departureDate >= ?2 AND j.returnDate <= ?3 "
		+ departureStationPopularityQueryOptions)
	List<StationPopularity> mostPopularDepartureStationsByDate(String returnStationId, LocalDateTime dateFrom, LocalDateTime dateTo);
}

