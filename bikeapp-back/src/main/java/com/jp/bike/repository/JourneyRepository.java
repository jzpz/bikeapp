package com.jp.bike.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.jp.bike.model.Journey;
import com.jp.bike.model.StationPopularity;

public interface JourneyRepository extends PagingAndSortingRepository<Journey, Integer> {
    Journey findById(int id);
    Page<Journey> findByDepartureStationId(String departureStationId, Pageable pageable);
    Page<Journey> findByReturnStationId(String returnStationId, Pageable pageable);
    Page<Journey> findByDepartureStationIdAndReturnStationId(String departureStationId, String returnStationId, Pageable pageable);

    Long count();
    Long countByDepartureStationId(String departureStationId);
    Long countByReturnStationId(String returnStationId);

    @Query("SELECT AVG(distanceCoveredInMeters) FROM Journey") 
    Long averageDistanceCovered();
    @Query("SELECT AVG(distanceCoveredInMeters) FROM Journey WHERE departureStationId = ?1") 
    Long averageDistanceCoveredByDepartureStation(String departureStationId);
    @Query("SELECT AVG(distanceCoveredInMeters) FROM Journey WHERE returnStationId = ?1") 
    Long averageDistanceCoveredByReturnStation(String returnStationId);

    /* 
        Queries that return 5 of the most popular departure/return stations
        Includes relevant information from Station and Journey tables
        (translated names, amount of departures/returns, station id)
    */

    // Query first part
    String stationPopularityDefaultColumns = 
        "SELECT new com.jp.bike.model.StationPopularity( " +
            "s.id, "+
            "s.nameLocaleFi, "+
            "s.nameLocaleSe, " +
            "s.nameLocaleEn, ";

    // Returns the most popular departure stations out of all - warning: SLOW
    @Query(stationPopularityDefaultColumns + 
        "COUNT(j.departureStationId) AS journeyAmount)" +
        "FROM Journey j " +
        "INNER JOIN Station s ON j.departureStationId = s.id " +
        "GROUP BY j.departureStationId ORDER BY journeyAmount DESC LIMIT 5")
    List<StationPopularity> mostPopularDepartureStations();

    // Returns the most popular return stations out of all - warning: SLOW
    @Query(stationPopularityDefaultColumns + 
        "COUNT(j.returnStationId) AS journeyAmount)" +
        "FROM Journey j " +
        "INNER JOIN Station s ON j.returnStationId = s.id " +
        "GROUP BY j.returnStationId ORDER BY journeyAmount DESC LIMIT 5")
    List<StationPopularity> mostPopularReturnStations();

    // Returns the most popular return stations for a departure station
    @Query(stationPopularityDefaultColumns + 
        "COUNT(j.returnStationId) AS journeyAmount)" +
        "FROM Journey j " +
        "INNER JOIN Station s ON j.returnStationId = s.id " +
        "WHERE j.departureStationId = ?1 "+
        "GROUP BY j.returnStationId ORDER BY journeyAmount DESC LIMIT 5")
    List<StationPopularity> mostPopularReturnStations(String departureStationId);

    // Returns the most popular departure stations for a return station
    @Query(stationPopularityDefaultColumns + 
        "COUNT(j.departureStationId) AS journeyAmount)" +
        "FROM Journey j " +
        "INNER JOIN Station s ON j.departureStationId = s.id " +
        "WHERE j.returnStationId = ?1 " +
        "GROUP BY j.departureStationId ORDER BY journeyAmount DESC LIMIT 5")
    List<StationPopularity> mostPopularDepartureStations(String returnStationId);

}

