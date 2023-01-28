package com.jp.bike.batch;

import java.util.Objects;
import java.util.stream.Stream;

import org.springframework.batch.item.ItemProcessor;
import org.springframework.lang.NonNull;

import com.jp.bike.model.Station;

// Makes sure that each station is validated and discards invalid stations
public class StationProcessor implements ItemProcessor<Station, Station> {

	@Override
	public Station process(final @NonNull Station station) throws Exception {
		
		final Integer fid = station.getFid();
		final String id = station.getId();
		final String nameLocaleFi = station.getNameLocaleFi();
		final String nameLocaleSe = station.getNameLocaleSe();
		final String nameLocaleEn = station.getNameLocaleEn();
		final String addressLocaleFi = station.getAddressLocaleFi();
		final Integer capacity = station.getCapacity();
		final Double coordinateX = station.getCoordinateX();
		final Double coordinateY = station.getCoordinateY();

		if(Stream.of(fid, id, nameLocaleFi, nameLocaleSe, nameLocaleEn, 
		addressLocaleFi, coordinateX, coordinateY, capacity).anyMatch(Objects::isNull)
		|| capacity <= 0) {
			return null;
		}

		return station;
	}

}