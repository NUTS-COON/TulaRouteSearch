package org.parser;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.parser.models.Route;
import org.parser.models.RouteItem;
import org.parser.models.Stop;
import org.parser.models.Town;

/**
 *
 * @author yurij
 */
public class AvtovokzalRoutesParser {
    
    private static final Set<String> routeUrls = new HashSet<>();
    private static final Map<String, Town> towns = new HashMap<>();
    private static final Map<String, Stop> stops = new HashMap<>();
    private static final Map<String, Route> routes = new HashMap<>();
            
    public static void parse() throws Exception {
        parseVokzal("https://www.avtovokzaly.ru/raspisanie/tula/avtovokzal");
    }
    
    public static void saveToDb() throws Exception {
        
        /*
        json = new String(Files.readAllBytes(Paths.get("stops.json")), "UTF-8");
        stops.putAll(JSON.parseObject(json, new TypeReference<Map<String, Stop>>() {}));
        
        json = new String(Files.readAllBytes(Paths.get("routes.json")), "UTF-8");
        routes.putAll(JSON.parseObject(json, new TypeReference<Map<String, Route>>() {}));
        */
        initDb();
        //mergeTowns(); 
        //mergeStops();   
        //mergeRoutes(); 
        //mergeRouteDays(); 
        mergeRouteItems();       
    }

    private static void mergeTowns() throws Exception {
        String json = new String(Files.readAllBytes(Paths.get("towns.json")), "UTF-8");
        towns.putAll(JSON.parseObject(json, new TypeReference<Map<String, Town>>() {}));
        
        Connection conn = createConnection();        
        Statement st = conn.createStatement();
        
        String data = towns.values().stream()
                .map(t -> 
                    String.format("SELECT N'%s' AS FullName, N'%s' AS ShortName, %s AS Lat, %s AS Lon", 
                            t.getFullName(),
                            t.getShortName(),
                            t.getLat(),
                            t.getLon()))
                .collect(Collectors.joining(" UNION ALL "));
                
        String sql = "MERGE Town AS target  \n" +
"    USING (" + data + ") AS src  \n" +
"    ON (target.FullName = src.FullName)  \n" +
"WHEN NOT MATCHED THEN  \n" +
"    INSERT (FullName, ShortName, Lat, Lon)  \n" +
"    VALUES (src.FullName, src.ShortName, src.Lat, src.Lon);";
        st.executeUpdate(sql);
    }

    private static void mergeStops() throws Exception {
        String json = new String(Files.readAllBytes(Paths.get("stops.json")), "UTF-8");
        stops.putAll(JSON.parseObject(json, new TypeReference<Map<String, Stop>>() {}));
        
        Connection conn = createConnection();        
        Statement st = conn.createStatement();
        
        ResultSet rs = st.executeQuery("SELECT * FROM Town");
        Map<String, Integer> townMap = new HashMap<>();
        while(rs.next()) {
            townMap.put(rs.getString("FullName"), rs.getInt("Id"));
        }
        
        String data = stops.values().stream()
                .map(t -> 
                    String.format("SELECT N'%s' AS Name, %s AS Lat, %s AS Lon, %s AS TownId", 
                            t.getName(),
                            t.getLat(),
                            t.getLon(),
                            townMap.get(t.getTown().getFullName())))
                .collect(Collectors.joining(" UNION ALL "));
                
        String sql = "MERGE Stop AS target  \n" +
"    USING (" + data + ") AS src  \n" +
"    ON (target.Name = src.Name)  \n" +
"WHEN NOT MATCHED THEN  \n" +
"    INSERT (Name, Lat, Lon, TownId)  \n" +
"    VALUES (src.Name, src.Lat, src.Lon, src.TownId);";
        st.executeUpdate(sql);
    }

    private static void mergeRoutes() throws Exception {
        String json = new String(Files.readAllBytes(Paths.get("routes.json")), "UTF-8");
        routes.putAll(JSON.parseObject(json, new TypeReference<Map<String, Route>>() {}));
        
        Connection conn = createConnection();        
        Statement st = conn.createStatement();
        
        ResultSet rs = st.executeQuery("SELECT * FROM Town");
        Map<String, Integer> townMap = new HashMap<>();
        while(rs.next()) {
            townMap.put(rs.getString("FullName"), rs.getInt("Id"));
        }
        
        List<List<Route>> packs = splittedRoutes(100);
        for(List<Route> pack : packs) {
            String data = pack.stream()
                    .map(t -> 
                        String.format("SELECT N'%s' AS Name, N'%s' AS Uid, N'%s' AS SrcUrl, N'%s' AS Time, %s AS FromTownId, %s AS ToTownId", 
                                t.getName(),
                                t.getUid(),
                                t.getSrcUrl(),
                                t.getStartTime(),
                                townMap.get(t.getFrom().getFullName()),
                                townMap.get(t.getTo().getFullName())))
                    .collect(Collectors.joining(" UNION ALL "));

            String sql = "MERGE Route AS target  \n" +
    "    USING (" + data + ") AS src  \n" +
    "    ON (target.Uid = src.Uid)  \n" +
    "WHEN NOT MATCHED THEN  \n" +
    "    INSERT (Name, Uid, SrcUrl, Time, FromTownId, ToTownId)  \n" +
    "    VALUES (src.Name, src.Uid, src.SrcUrl, src.Time, src.FromTownId, src.ToTownId);";
            st.executeUpdate(sql);
        }
    }

    private static void mergeRouteItems() throws Exception {
        String json = new String(Files.readAllBytes(Paths.get("routes.json")), "UTF-8");
        routes.putAll(JSON.parseObject(json, new TypeReference<Map<String, Route>>() {}));
        
        Connection conn = createConnection();        
        Statement st = conn.createStatement();
        
        ResultSet rs = st.executeQuery("SELECT * FROM Stop");
        Map<String, Integer> stopMap = new HashMap<>();
        while(rs.next()) {
            stopMap.put(rs.getString("Name"), rs.getInt("Id"));
        }        
        
        rs = st.executeQuery("SELECT * FROM Route");
        Map<String, Integer> routeMap = new HashMap<>();
        while(rs.next()) {
            routeMap.put(rs.getString("Uid"), rs.getInt("Id"));
        }
        
        List<List<Route>> packs = splittedRoutes(50);
        for(List<Route> pack : packs) {
            String ids = pack.stream()
                    .map(t -> routeMap.get(t.getUid()).toString())
                    .collect(Collectors.joining(","));;
            st.executeUpdate("DELETE FROM RouteItems WHERE RouteId IN (" + ids + ")");
                        
            String data = pack.stream()
                    .map(t -> t.getItems().stream()
                            .map(i ->  String.format("SELECT %s AS FromTime, %s AS ToTime, %s AS StopId, %s AS RouteId", 
                                i.getFromTime() != null ? "N'" + i.getFromTime() + "'" : "NULL",
                                i.getToTime() != null ? "N'" + i.getToTime() + "'" : "NULL",
                                stopMap.get(i.getStop().getName()),
                                routeMap.get(t.getUid())))
                            .collect(Collectors.joining(" UNION ALL ")))
                    .collect(Collectors.joining(" UNION ALL "));

            st.executeUpdate("INSERT INTO RouteItems(FromTime, ToTime, StopId, RouteId) " + data);
        }
    }

    private static void mergeRouteDays() throws Exception {
        String json = new String(Files.readAllBytes(Paths.get("routes.json")), "UTF-8");
        routes.putAll(JSON.parseObject(json, new TypeReference<Map<String, Route>>() {}));
        
        Connection conn = createConnection();        
        Statement st = conn.createStatement();
        
        ResultSet rs = st.executeQuery("SELECT * FROM Route");
        Map<String, Integer> routeMap = new HashMap<>();
        while(rs.next()) {
            routeMap.put(rs.getString("Uid"), rs.getInt("Id"));
        }
        
        List<List<Route>> packs = splittedRoutes(100);
        for(List<Route> pack : packs) {
            String ids = pack.stream()
                    .map(t -> routeMap.get(t.getUid()).toString())
                    .collect(Collectors.joining(","));;
            st.executeUpdate("DELETE FROM RouteDays WHERE RouteId IN (" + ids + ")");
            
            
            String data = pack.stream()
                    .map(t -> t.getDays().stream()
                            .map(d ->  String.format("SELECT %s AS DayOfWeek, %s AS RouteId", 
                                d.getValue(),
                                routeMap.get(t.getUid())))
                            .collect(Collectors.joining(" UNION ALL ")))
                    .collect(Collectors.joining(" UNION ALL "));

            st.executeUpdate("INSERT INTO RouteDays(DayOfWeek, RouteId) " + data);
        }
    }
    
    private static List<List<Route>> splittedRoutes(int pack) {
        List<List<Route>> res = new ArrayList<>();
        List<Route> tmp = new ArrayList<>();
        List<Route> all = new ArrayList<>(routes.values());
        for(int i = 0; i < routes.size(); i++) {
            tmp.add(all.get(i));
            if(i % 100 == 0 && i > 0) {                
                res.add(tmp);
                tmp = new ArrayList<>();
            }
        }
        res.add(tmp);
        return res;
    }
    
    private static void initDb() throws Exception {
        Connection conn = createConnection();        
        Statement st = conn.createStatement();
        /*
        st.executeUpdate("DROP TABLE Town");
        st.executeUpdate("DROP TABLE Stop");
        st.executeUpdate("DROP TABLE Route");
        st.executeUpdate("DROP TABLE RouteDays");
        st.executeUpdate("DROP TABLE RouteItems");
        */
        st.executeUpdate("if not exists (select * from sysobjects where name='Town' and xtype='U')" +
"    create table Town (" +
"        Id INT IDENTITY(1,1) PRIMARY KEY NOT NULL," +
"        FullName NVARCHAR(500) NULL," +
"        ShortName NVARCHAR(500) NULL," +
"        Lat DECIMAL(12,6) NULL," +
"        Lon DECIMAL(12,6) NULL" +
"    )");
        
        st.executeUpdate("if not exists (select * from sysobjects where name='Stop' and xtype='U')" +
"    create table Stop (" +
"        Id INT IDENTITY(1,1) PRIMARY KEY NOT NULL," +
"        Name NVARCHAR(500) NULL," +
"        Lat DECIMAL(12,6) NULL," +
"        Lon DECIMAL(12,6) NULL," +
"        TownId INT NULL" +
"    )");
        
        st.executeUpdate("if not exists (select * from sysobjects where name='Route' and xtype='U')" +
"    create table Route (" +
"        Id INT IDENTITY(1,1) PRIMARY KEY NOT NULL," +
"        Name NVARCHAR(500) NULL," +
"        Uid NVARCHAR(500) NULL," +
"        SrcUrl NVARCHAR(500) NULL," +
"        FromTownId INT NULL," +
"        ToTownId INT NULL," +
"        Time Time NULL" +
"    )");
        
        st.executeUpdate("if not exists (select * from sysobjects where name='RouteDays' and xtype='U')" +
"    create table RouteDays (" +
"        Id INT IDENTITY(1,1) PRIMARY KEY NOT NULL," +
"        RouteId INT NULL," +
"        DayOfWeek INT NULL" +
"    )");
                
        st.executeUpdate("if not exists (select * from sysobjects where name='RouteItems' and xtype='U')" +
"    create table RouteItems (" +
"        Id INT IDENTITY(1,1) PRIMARY KEY NOT NULL," +
"        FromTime Time NULL," +
"        ToTime Time NULL," +
"        StopId INT NULL," +
"        RouteId INT NULL" +
"    )");
    }
    
    private static Connection createConnection() throws SQLException {
        String hostName = "firmachi.database.windows.net"; // update me
        String dbName = "TulaRouteSearcher"; // update me
        String user = "firmachi"; // update me
        String password = "123123123q!"; // update me
        String url = String.format("jdbc:sqlserver://%s:1433;database=%s;user=%s;password=%s;encrypt=true;useUnicode=true;"
            + "hostNameInCertificate=*.database.windows.net;loginTimeout=30;", hostName, dbName, user, password);
        return DriverManager.getConnection(url);
    }
    
    private static void parseVokzal(String url) throws Exception {
        if(Files.exists(Paths.get("routeUrls.json"))) {
            String json = new String(Files.readAllBytes(Paths.get("routeUrls.json")), "UTF-8");
            routeUrls.addAll(JSON.parseArray(json, String.class));
        } else {
            crawlRoutesUrls(url);
        }
        
        parseRoutes();
        save();
    }
    
    private synchronized static void save() throws Exception {
        Files.write(Paths.get("towns.json"), JSON.toJSONString(towns, true).getBytes("UTF-8"));
        Files.write(Paths.get("stops.json"), JSON.toJSONString(stops, true).getBytes("UTF-8"));
        Files.write(Paths.get("routes.json"), JSON.toJSONString(routes, true).getBytes("UTF-8"));
    }
    
    private static void crawlRoutesUrls(String url) throws Exception {
        Document doc = Jsoup.connect(url).get();
        Element cont = doc.getElementsByClass("wide-li").get(0);
        Elements links = cont.getElementsByTag("a");
        
        int i = 1;
        for(Element link : links) {
            String tmpUrl = link.attr("href");
            parseRoutesPage(tmpUrl);
            System.out.println(String.format("ParseRoutesPage %s/%s: %s", 
                    i++, links.size(), tmpUrl));
        }
        
        Files.write(Paths.get("routeUrls.json"), JSON.toJSONString(routeUrls, true).getBytes("UTF-8"));
    }
    
    private static void parseRoutesPage(String url) {
        try {
            Document doc = Jsoup.connect(url).get();
            Elements tables = doc.getElementsByTag("tbody");
            for(Element table : tables) {
               if(!table.hasAttr("data-unique-key"))
                   continue;
               
                String data = table.attr("data-unique-key");
                String[] parts = data.split("_");
                String routeUrl = String.format(
                       "https://www.avtovokzaly.ru/avtobus/tula-kaluga/%s/%s/%s/%s", 
                       parts[0], parts[1], parts[2], parts[3]);
                routeUrls.add(routeUrl);
            }           
        } catch(Exception e) {
            System.out.println("Error parseRoutesPage    " + url);
            e.printStackTrace();
        }
    }

    private static void parseRoutes() throws Exception {
        ExecutorService es = Executors.newFixedThreadPool(10);

        int i = 1;
        for (String routeUrl : routeUrls) {
            final int j = i++;
            es.submit(() -> {
                try {
                    parseRoute(routeUrl);
                    System.out.println(String.format("ParseRoute %s/%s [%s]", j, routeUrls.size(), routeUrl));
                    if(j % 50 == 0) {
                        save();
                    }
                } catch (Exception e) {
                    System.out.println(String.format("Error parseRoute [%s]", routeUrl));
                    e.printStackTrace();
                }
            });
        }

        es.shutdown();
        es.awaitTermination(1, TimeUnit.DAYS);
    }
    
    public static void parseRoute(String url) throws Exception{
        Document doc = Jsoup.connect(url).followRedirects(true).get();
        
        String name = doc.getElementsByTag("h1").get(0).text().replace("Расписание автобуса", "").trim();
        String timeStr = doc
                .getElementsByClass("departures-list-item").get(0)
                .getElementsByTag("li").stream()
                .filter(t -> t.hasClass("active")).findFirst().get()
                .text().trim();
        LocalTime time = LocalTime.parse(timeStr); 
        String uid = name.replace("—", "-").replace(" - ", "-") + "-" + time;
                
        List<DayOfWeek> days = new ArrayList<>();
        String regularity = doc.getElementsByClass("regularity").get(0).text().trim();
        String[] parts = regularity.split((", "));
        for(String part : parts) {
            switch(part.toLowerCase().trim()) {
                case "ежедневно":
                    days.addAll(Arrays.asList(DayOfWeek.values()));
                    break;
                case "пн":
                    days.add(DayOfWeek.MONDAY);
                    break;
                case "вт":
                    days.add(DayOfWeek.TUESDAY);
                    break;
                case "ср":
                    days.add(DayOfWeek.WEDNESDAY);
                    break;
                case "чт":
                    days.add(DayOfWeek.THURSDAY);
                    break;
                case "пт":
                    days.add(DayOfWeek.FRIDAY);
                    break;
                case "сб":
                    days.add(DayOfWeek.SATURDAY);
                    break;
                case "вс":
                    days.add(DayOfWeek.SUNDAY);
                    break;
                default:
                    return;
            }
        }
        
        Route route;
        synchronized (AvtovokzalRoutesParser.class) {
            if(routes.containsKey(uid))
                return;
            
            route = new Route(name, uid, url, time, days);
            routes.put(uid, route);
        }
        
        Element table = doc
                .getElementsByClass("route-about").get(0)
                .getElementsByTag("tbody").get(0);
        Elements rows = table.getElementsByTag("tr");
        for(Element row : rows) {
            if(row.hasClass("buy-ticket"))
                continue;
            
            Elements cells = row.getElementsByTag("td");
            
            int i;
            String startTime;
            String endTime;
            if(cells.size() == 4) {
                i = 2;
                startTime = cells.get(1).text().trim();
                endTime = cells.get(1).text().trim();
            } else {
                i = 3;
                startTime = cells.get(1).text().trim();
                endTime = cells.get(2).text().trim();
            }
            String townName = cells.get(i).text().trim(); 
            String townShortName = townName.split(",")[0].trim();   
            Element townInfo = cells.get(i).getElementsByClass("open-map action text-dashed hide-on-print").get(0);
            String townLat = townInfo.attr("data-latitude").trim();
            String townLon = townInfo.attr("data-longitude").trim();
            
            Town town;
            synchronized (AvtovokzalRoutesParser.class) {
                if(towns.containsKey(townName)) {
                    town = towns.get(townName);
                } else {
                    town = new Town(townName, townShortName, Double.parseDouble(townLat), Double.parseDouble(townLon));
                    towns.put(townName, town);
                }
            }
        
            String stopName = cells.get(i + 1).text().trim();
            String stopLat;
            String stopLon;
            Elements geoPoints = cells.get(i + 1).getElementsByClass("open-map action text-dashed hide-on-print");
            if(geoPoints.size() > 0) {
                Element stopInfo = geoPoints.get(0);
                stopLat = stopInfo.attr("data-latitude").trim();
                stopLon = stopInfo.attr("data-longitude").trim();            
            } else {
                stopName = town.getFullName();
                stopLat = townLat;
                stopLon = townLon;
            }
                
            Stop stop;
            synchronized (AvtovokzalRoutesParser.class) {
                if(stops.containsKey(stopName)) {
                    stop = stops.get(stopName);
                } else {
                    stop = new Stop(stopName, Double.parseDouble(stopLat), Double.parseDouble(stopLon), town);
                    stops.put(stopName, stop);
                }
            }
            
            RouteItem ri = new RouteItem(town, stop, 
                    startTime.length() == 5 ? LocalTime.parse(startTime) : null, 
                    endTime.length() == 5 ? LocalTime.parse(endTime) : null);
            route.getItems().add(ri);
        }  
        
        route.setFrom(route.getItems().get(0).getTown());
        route.setTo(route.getItems().get(route.getItems().size() - 1).getTown());
    }
}
