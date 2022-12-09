package com.jp.bike.repository;

import org.springframework.data.repository.PagingAndSortingRepository;

import com.jp.bike.model.Journey;

public interface JourneyRepository extends PagingAndSortingRepository<Journey, Integer> {
}

