package org.parser.models;

import java.time.LocalTime;

/**
 *
 * @author yurij
 */
public class RouteItem {
    private Town town;
    private Stop stop;
    private LocalTime fromTime;
    private LocalTime toTime;

    public RouteItem() {
    }
    
    public RouteItem(Town town, Stop stop, LocalTime fromTime, LocalTime toTime) {
        this.town = town;
        this.stop = stop;
        this.fromTime = fromTime;
        this.toTime = toTime;
    }

    public Town getTown() {
        return town;
    }

    public void setTown(Town town) {
        this.town = town;
    }

    public Stop getStop() {
        return stop;
    }

    public void setStop(Stop stop) {
        this.stop = stop;
    }

    public LocalTime getFromTime() {
        return fromTime;
    }

    public void setFromTime(LocalTime fromTime) {
        this.fromTime = fromTime;
    }

    public LocalTime getToTime() {
        return toTime;
    }

    public void setToTime(LocalTime toTime) {
        this.toTime = toTime;
    }
}
