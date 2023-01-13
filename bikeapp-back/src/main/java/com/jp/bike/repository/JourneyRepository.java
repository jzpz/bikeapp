package com.jp.bike.repository;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.jp.bike.model.Journey;

public interface JourneyRepository extends PagingAndSortingRepository<Journey, Integer> {
    Journey findById(int id);

    Page<Journey> findAll(
        Pageable pageable);

    Page<Journey> findByDepartureDateGreaterThanEqualAndReturnDateLessThanEqual(
        LocalDateTime dateFrom, LocalDateTime dateTo, Pageable pageable);

    Page<Journey> findByDepartureStationId(
        String departureStationId, Pageable pageable);

    Page<Journey> findByDepartureStationIdAndDepartureDateGreaterThanEqualAndReturnDateLessThanEqual(
        String departureStationId, LocalDateTime dateFrom, LocalDateTime dateTo, Pageable pageable);

    Page<Journey> findByReturnStationId(
        String returnStationId, Pageable pageable);

    Page<Journey> findByReturnStationIdAndDepartureDateGreaterThanEqualAndReturnDateLessThanEqual(
        String returnStationId, LocalDateTime dateFrom, LocalDateTime dateTo, Pageable pageable);

    Page<Journey> findByDepartureStationIdAndReturnStationId(
        String departureStationId, String returnStationId, Pageable pageable);

    Page<Journey> findByDepartureStationIdAndReturnStationIdAndDepartureDateGreaterThanEqualAndReturnDateLessThanEqual(
        String departureStationId, String returnStationId, LocalDateTime dateFrom, LocalDateTime dateTo, Pageable pageable);

    Long count();

    Long countByDepartureDateGreaterThanEqualAndReturnDateLessThanEqual(
        LocalDateTime dateFrom, LocalDateTime dateTo);

    Long countByDepartureStationId(
        String departureStationId);

    Long countByDepartureStationIdAndDepartureDateGreaterThanEqualAndReturnDateLessThanEqual(
        String departureStationId, LocalDateTime dateFrom, LocalDateTime dateTo);

    Long countByReturnStationId(
        String returnStationId);

    Long countByReturnStationIdAndDepartureDateGreaterThanEqualAndReturnDateLessThanEqual(
        String returnStationId, LocalDateTime dateFrom, LocalDateTime dateTo);

    String averageDistanceCoveredQuery = "SELECT AVG(distanceCoveredInMeters) FROM Journey";

    @Query(averageDistanceCoveredQuery) 
    Long averageDistanceCovered();

    @Query(averageDistanceCoveredQuery + " WHERE departureStationId = ?1") 
    Long averageDistanceCoveredByDepartureStation(
        String departureStationId);
    
    @Query(averageDistanceCoveredQuery + " WHERE departureStationId = ?1"
        + " AND departureDate >= ?2 AND returnDate <= ?3 ") 
    Long averageDistanceCoveredByDepartureStationIdAndDepartureDateGreaterThanEqualAndReturnDateLessThanEqual(
        String departureStationId, LocalDateTime dateFrom, LocalDateTime dateTo);

    @Query(averageDistanceCoveredQuery + " WHERE returnStationId = ?1") 
    Long averageDistanceCoveredByReturnStation(
        String returnStationId);

    @Query(averageDistanceCoveredQuery + " WHERE returnStationId = ?1"
        + " AND departureDate >= ?2 AND returnDate <= ?3 ") 
    Long averageDistanceCoveredByReturnStationIdAndDepartureDateGreaterThanEqualAndReturnDateLessThanEqual(
        String returnStationId, LocalDateTime dateFrom, LocalDateTime dateTo);

}

