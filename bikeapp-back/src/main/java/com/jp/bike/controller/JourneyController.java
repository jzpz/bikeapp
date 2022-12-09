package com.jp.bike.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jp.bike.model.Journey;
import com.jp.bike.repository.JourneyRepository;

@RestController
class JourneyController {

  private final JourneyRepository repository;

  JourneyController(JourneyRepository repository) {
    this.repository = repository;
  }

  @GetMapping("/journeys")
  List<Journey> all() {
    return repository.findAll();
  }
}