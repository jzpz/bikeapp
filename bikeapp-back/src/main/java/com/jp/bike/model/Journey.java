package com.jp.bike.model;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "bikeapp_journeys")
public class Journey {
	
	@GeneratedValue(strategy=GenerationType.IDENTITY) 
	private @Id Integer id;
	private Date departureDate;
	private Date returnDate;
	private String departureStationId;
	private String departureStationName;
	private String returnStationId;
	private String returnStationName;
	@Column(name = "distanceCovered")
	private Integer distanceCoveredInMeters;
	@Column(name = "duration")
	private Integer durationInSeconds;

	public Journey() {}

	public Journey(
			Date departureDate, Date returnDate, String departureStationId, 
			String departureStationName, String returnStationId, String returnStationName, 
			Integer distanceCoveredInMeters, Integer durationInSeconds) {

		this.departureDate = departureDate;
		this.returnDate = returnDate;
		this.departureStationId = departureStationId;
		this.departureStationName = departureStationName;
		this.returnStationId = returnStationId;
		this.returnStationName = returnStationName;
		this.distanceCoveredInMeters = distanceCoveredInMeters;
		this.durationInSeconds = durationInSeconds;
	}

	public Integer getId() {
		return id;
	}

	public Date getDepartureDate() {
		return departureDate;
	}

	public Date getReturnDate() {
		return returnDate;
	}

	public String getDepartureStationId() {
		return departureStationId;
	}

	public String getDepartureStationName() {
		return departureStationName;
	}

	public String getReturnStationId() {
		return returnStationId;
	}

	public String getReturnStationName() {
		return returnStationName;
	}

	public Integer getDistanceCoveredInMeters() {
		return distanceCoveredInMeters;
	}

	public Integer getDurationInSeconds() {
		return durationInSeconds;
	}
	
}