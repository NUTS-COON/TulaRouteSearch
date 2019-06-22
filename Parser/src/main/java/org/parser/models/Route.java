package org.parser.models;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author yurij
 */
public class Route {

    private String name;
    private String uid;
    private String srcUrl;
    private Town from;
    private Town to;
    private LocalTime startTime;
    private List<RouteItem> items; 
    private List<DayOfWeek> days;

    public Route() {
    }
    
    public Route(String name, String uid, String srcUrl, LocalTime startTime, List<DayOfWeek> days) {
        this.name = name;
        this.uid = uid;
        this.srcUrl = srcUrl;
        this.startTime = startTime;
        this.days = days;
        this.items = new ArrayList<>();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    public String getSrcUrl() {
        return srcUrl;
    }

    public void setSrcUrl(String srcUrl) {
        this.srcUrl = srcUrl;
    }

    public Town getFrom() {
        return from;
    }

    public void setFrom(Town from) {
        this.from = from;
    }

    public Town getTo() {
        return to;
    }

    public void setTo(Town to) {
        this.to = to;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public List<RouteItem> getItems() {
        return items;
    }

    public void setItems(List<RouteItem> items) {
        this.items = items;
    }

    public List<DayOfWeek> getDays() {
        return days;
    }

    public void setDays(List<DayOfWeek> days) {
        this.days = days;
    }
}
