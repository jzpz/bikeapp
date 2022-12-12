package com.jp.bike.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.jp.bike.model.Journey;

public interface JourneyRepository extends PagingAndSortingRepository<Journey, Integer> {
    Journey findById(int id);
    Page<Journey> findByDepartureStationId(String departureStationId, Pageable pageable);
    Page<Journey> findByReturnStationId(String returnStationId, Pageable pageable);
    Page<Journey> findByDepartureStationIdAndReturnStationId(String departureStationId, String returnStationId, Pageable pageable);
}

