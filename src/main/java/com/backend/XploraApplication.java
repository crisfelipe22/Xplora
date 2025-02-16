package com.backend;

import com.backend.dbconnection.H2Connection;

public class XploraApplication {
    public static void main(String[] args){
        H2Connection.ejecutarScriptInicial();
    }
}