package org.parser.models;

/**
 *
 * @author yurij
 */
public class Stop {
    
    private String name;
    private double lat;
    private double lon;
    private Town town;

    public Stop() {
    }
    
    public Stop(String name, double lat, double lon, Town town) {
        this.name = name;
        this.lat = lat;
        this.lon = lon;
        this.town = town;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public Town getTown() {
        return town;
    }

    public void setTown(Town town) {
        this.town = town;
    }
}
