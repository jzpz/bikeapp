package com.jp.bike.model;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Station {

	private @Id int fid;
	private int id;
	private String nameLocaleFi;
	private String nameLocaleSe;
	private String addressLocaleFi;
	private String addressLocaleSe;
    private String cityLocaleFi;
	private String cityLocaleSe;
    private String operator;
	private String capacity;
    private String coordinateX;
	private String coordinateY;
    
    public Station(int fid, int id, String nameLocaleFi, String nameLocaleSe, String addressLocaleFi,
            String addressLocaleSe, String cityLocaleFi, String cityLocaleSe, String operator, String capacity,
            String coordinateX, String coordinateY) {
        this.fid = fid;
        this.id = id;
        this.nameLocaleFi = nameLocaleFi;
        this.nameLocaleSe = nameLocaleSe;
        this.addressLocaleFi = addressLocaleFi;
        this.addressLocaleSe = addressLocaleSe;
        this.cityLocaleFi = cityLocaleFi;
        this.cityLocaleSe = cityLocaleSe;
        this.operator = operator;
        this.capacity = capacity;
        this.coordinateX = coordinateX;
        this.coordinateY = coordinateY;
    }

    

}