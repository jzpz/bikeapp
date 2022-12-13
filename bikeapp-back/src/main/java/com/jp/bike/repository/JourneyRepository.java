package com.jp.bike.repository;

import java.util.HashMap;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.jp.bike.model.Journey;

public interface JourneyRepository extends PagingAndSortingRepository<Journey, Integer> {
    Journey findById(int id);

    Long count();
    Long countByDepartureStationId(String departureStationId);
    Long countByReturnStationId(String returnStationId);

    @Query("SELECT AVG(distanceCoveredInMeters) FROM Journey") 
    Long averageDistanceCovered();
    @Query("SELECT AVG(distanceCoveredInMeters) FROM Journey WHERE departureStationId = ?1") 
    Long averageDistanceCoveredByDepartureStation(String departureStationId);
    @Query("SELECT AVG(distanceCoveredInMeters) FROM Journey WHERE returnStationId = ?1") 
    Long averageDistanceCoveredByReturnStation(String returnStationId);

    Page<Journey> findByDepartureStationId(String departureStationId, Pageable pageable);
    Page<Journey> findByReturnStationId(String returnStationId, Pageable pageable);
    Page<Journey> findByDepartureStationIdAndReturnStationId(String departureStationId, String returnStationId, Pageable pageable);
}

