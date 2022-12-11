package com.jp.bike.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.jp.bike.model.Journey;

public interface JourneyRepository extends PagingAndSortingRepository<Journey, Integer> {
    Journey findById(int id);
    Page<Journey> findByDepartureStationId(int departureStationId, Pageable pageable);
    Page<Journey> findByReturnStationId(int returnStationId, Pageable pageable);
    Page<Journey> findByDepartureStationIdAndReturnStationId(int departureStationId, int returnStationId, Pageable pageable);
}

