package com.jp.bike.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "bikeapp_stations")
public class Station {

	private Integer fid;
	private @Id String id;
	private String nameLocaleFi;
	private String nameLocaleSe;
	private String nameLocaleEn;
	private String addressLocaleFi;
	private String addressLocaleSe;
	private String cityLocaleFi;
	private String cityLocaleSe;
	private String operator;
	private Integer capacity;
	@Column(name = "coordinate_x")
	private Double coordinateX;
	@Column(name = "coordinate_y")
	private Double coordinateY;

	public Station() {}

	public Station(Integer fid, String id, String nameLocaleFi, String nameLocaleSe, String nameLocaleEn, 
			String addressLocaleFi, String addressLocaleSe, String cityLocaleFi, String cityLocaleSe, 
			String operator, Integer capacity, Double coordinateX, Double coordinateY) {
		this.fid = fid;
		this.id = id;
		this.nameLocaleFi = nameLocaleFi;
		this.nameLocaleSe = nameLocaleSe;
		this.nameLocaleEn = nameLocaleEn;
		this.addressLocaleFi = addressLocaleFi;
		this.addressLocaleSe = addressLocaleSe;
		this.cityLocaleFi = cityLocaleFi;
		this.cityLocaleSe = cityLocaleSe;
		this.operator = operator;
		this.capacity = capacity;
		this.coordinateX = coordinateX;
		this.coordinateY = coordinateY;
	}

	public Integer getFid() {
		return fid;
	}

	public String getId() {
		return id;
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

	public String getAddressLocaleFi() {
		return addressLocaleFi;
	}

	public String getAddressLocaleSe() {
		return addressLocaleSe;
	}

	public String getCityLocaleFi() {
		return cityLocaleFi;
	}

	public String getCityLocaleSe() {
		return cityLocaleSe;
	}

	public String getOperator() {
		return operator;
	}

	public Integer getCapacity() {
		return capacity;
	}

	public Double getCoordinateX() {
		return coordinateX;
	}

	public Double getCoordinateY() {
		return coordinateY;
	}

	public void setFid(Integer fid) {
		this.fid = fid;
	}

	public void setId(String id) {
		this.id = id;
	}

	public void setNameLocaleFi(String nameLocaleFi) {
		this.nameLocaleFi = nameLocaleFi;
	}

	public void setNameLocaleSe(String nameLocaleSe) {
		this.nameLocaleSe = nameLocaleSe;
	}

	public void setNameLocaleEn(String nameLocaleEn) {
		this.nameLocaleEn = nameLocaleEn;
	}

	public void setAddressLocaleFi(String addressLocaleFi) {
		this.addressLocaleFi = addressLocaleFi;
	}

	public void setAddressLocaleSe(String addressLocaleSe) {
		this.addressLocaleSe = addressLocaleSe;
	}

	public void setCityLocaleFi(String cityLocaleFi) {
		this.cityLocaleFi = cityLocaleFi;
	}

	public void setCityLocaleSe(String cityLocaleSe) {
		this.cityLocaleSe = cityLocaleSe;
	}

	public void setOperator(String operator) {
		this.operator = operator;
	}

	public void setCapacity(Integer capacity) {
		this.capacity = capacity;
	}

	public void setCoordinateX(Double coordinateX) {
		this.coordinateX = coordinateX;
	}

	public void setCoordinateY(Double coordinateY) {
		this.coordinateY = coordinateY;
	}

	
}