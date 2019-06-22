package org.parser;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 *
 * @author yurij
 */
public class Main {
    
    public static void main(String[] args) throws Exception {
        AvtovokzalRoutesParser.saveToDb();
    }
}
