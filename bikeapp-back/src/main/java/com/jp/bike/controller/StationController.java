package com.jp.bike.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jp.bike.model.Station;
import com.jp.bike.repository.StationRepository;

@RestController
class StationController {

  private final StationRepository repository;

  StationController(StationRepository repository) {
    this.repository = repository;
  }

  @GetMapping("/stations")
  List<Station> all() {
    return repository.findAll();
  }
}