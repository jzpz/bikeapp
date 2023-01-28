package com.jp.bike.model;

// This class is used to list the most popular
// departure/return stations from a specific station or all stations
public class StationPopularity {

	private Integer id;
	private String nameLocaleFi;
	private String nameLocaleSe;
	private String nameLocaleEn;
	private Integer journeyAmount;

	public StationPopularity() {}

	public StationPopularity(Integer id, String nameLocaleFi, String nameLocaleSe,
			String nameLocaleEn, Integer journeyAmount) {
		this.id = id;
		this.journeyAmount = journeyAmount;
		this.nameLocaleFi = nameLocaleFi;
		this.nameLocaleSe = nameLocaleSe;
		this.nameLocaleEn = nameLocaleEn;
	}

	public Integer getId() {
		return id;
	}

	public Integer getJourneyAmount() {
		return journeyAmount;
	}

	public String getNameLocaleFi() {
		return nameLocaleFi;
	}

	public String getNameLocaleSe() {
		return nameLocaleSe;
	}

	public String getNameLocaleEn() {
		return nameLocaleEn;
	}

}