package com.jp.bike.model;

// This class is used to list the most popular
// departure/return stations from a specific station or all stations
public class StationPopularity {

    private Object id;
    private String nameLocaleFi;
    private String nameLocaleSe;
    private String nameLocaleEn;
    private Object journeyAmount;

    public StationPopularity() {}

    public StationPopularity(Object id, String nameLocaleFi, String nameLocaleSe,
            String nameLocaleEn, Object journeyAmount) {
        this.id = id;
        this.journeyAmount = journeyAmount;
        this.nameLocaleFi = nameLocaleFi;
        this.nameLocaleSe = nameLocaleSe;
        this.nameLocaleEn = nameLocaleEn;
    }

    public Object getId() {
        return id;
    }

    public Object getJourneyAmount() {
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