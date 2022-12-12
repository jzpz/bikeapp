package com.jp.bike.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jp.bike.model.Station;

public interface StationRepository extends JpaRepository<Station, Integer> {
    Station findById(String id);
}

