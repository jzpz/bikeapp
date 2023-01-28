package com.jp.bike.batch;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.stream.Stream;

import org.springframework.batch.item.ItemProcessor;
import org.springframework.lang.NonNull;

import com.jp.bike.model.Journey;

// Makes sure that each journey is validated and discards invalid journeys
public class JourneyProcessor implements ItemProcessor<Journey, Journey> {

	@Override
	public Journey process(final @NonNull Journey journey) throws Exception {
		
		final LocalDateTime departureDate = journey.getDepartureDate();
		final LocalDateTime returnDate = journey.getReturnDate();
		final String departureStationId = journey.getDepartureStationId();
		final String returnStationId = journey.getReturnStationId();
		final String departureStationName = journey.getDepartureStationName();
		final String returnStationName = journey.getReturnStationName();
		final Integer distanceCoveredInMeters = journey.getDistanceCoveredInMeters();
		final Integer durationInSeconds = journey.getDurationInSeconds();

		if(Stream.of(departureDate, returnDate, departureStationId,
			departureStationName, returnStationId, returnStationName, 
			distanceCoveredInMeters, durationInSeconds)
				.anyMatch(Objects::isNull)
		|| distanceCoveredInMeters < 10 
		|| durationInSeconds < 10 
		|| departureDate.isAfter(returnDate)
		|| distanceCoveredInMeters > 100000 
		|| durationInSeconds > 20000) {
			return null;
		}

		return journey;
	}

}