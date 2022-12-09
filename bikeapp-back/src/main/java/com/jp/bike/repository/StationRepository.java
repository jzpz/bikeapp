package com.jp.bike.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.jp.bike.model.Station;

public interface StationRepository extends PagingAndSortingRepository<Station, Integer> {
}

