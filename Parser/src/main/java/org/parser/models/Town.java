package org.parser.models;

/**
 *
 * @author yurij
 */
public class Town {
    
    private String fullName;
    private String shortName;
    private double lat;
    private double lon;

    public Town() {
    }

    public Town(String fullName, String shortName, double lat, double lon) {
        this.fullName = fullName;
        this.shortName = shortName;
        this.lat = lat;
        this.lon = lon;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public double getLon() {
        return lon;
    }

    public void setLon(double lon) {
        this.lon = lon;
    }
}
