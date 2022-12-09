package com.jp.bike.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "bikeapp_stations")
public class Station {

	private @Id int fid;
	private int id;
	private String nameLocaleFi;
	private String nameLocaleSe;
    private String nameLocaleEn;
	private String addressLocaleFi;
	private String addressLocaleSe;
    private String cityLocaleFi;
	private String cityLocaleSe;
    private String operator;
	private String capacity;
    @Column(name = "coordinate_x")
    private Long coordinateX;
    @Column(name = "coordinate_y")
	private Long coordinateY;
    
    public Station() {}

    public Station(int fid, int id, String nameLocaleFi, String nameLocaleSe, String nameLocaleEn, String addressLocaleFi,
            String addressLocaleSe, String cityLocaleFi, String cityLocaleSe, String operator, String capacity,
            Long coordinateX, Long coordinateY) {
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

    public int getFid() {
        return fid;
    }

    public int getId() {
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

    public String getCapacity() {
        return capacity;
    }

    public Long getCoordinateX() {
        return coordinateX;
    }

    public Long getCoordinateY() {
        return coordinateY;
    }

    

}