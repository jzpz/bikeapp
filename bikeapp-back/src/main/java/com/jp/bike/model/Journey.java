package com.jp.bike.model;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Journey {

	private @Id @GeneratedValue int id;
	private Date departureDate;
	private Date returnDate;
	private int departureStationId;
	private String departureStationName;
	private int returnStationId;
	private String returnStationName;
	@Column(name = "distanceCovered")
	private int distanceCoveredInMeters;
	@Column(name = "duration")
	private int durationInSeconds;

	public Journey(
			Date departureDate, Date returnDate, int departureStationId, 
			String departureStationName, int returnStationId, String returnStationName, 
			int distanceCoveredInMeters, int durationInSeconds) {

		this.departureDate = departureDate;
		this.returnDate = returnDate;
		this.departureStationId = departureStationId;
		this.departureStationName = departureStationName;
		this.returnStationId = returnStationId;
		this.returnStationName = returnStationName;
		this.distanceCoveredInMeters = distanceCoveredInMeters;
		this.durationInSeconds = durationInSeconds;
	}


	public Date getDepartureDate() {
		return departureDate;
	}

	public Date getReturnDate() {
		return returnDate;
	}

	public int getDepartureStationId() {
		return departureStationId;
	}

	public String getDepartureStationName() {
		return departureStationName;
	}

	public int getReturnStationId() {
		return returnStationId;
	}

	public String getReturnStationName() {
		return returnStationName;
	}

	public int getDistanceCoveredInMeters() {
		return distanceCoveredInMeters;
	}

	public int getDurationInSeconds() {
		return durationInSeconds;
	}
	
}