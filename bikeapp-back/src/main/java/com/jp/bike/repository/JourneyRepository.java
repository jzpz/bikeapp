package com.jp.bike.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jp.bike.model.Journey;

public interface JourneyRepository extends JpaRepository<Journey, Long> {
}

