package com.project.DatabaseAPI;

import java.io.ByteArrayOutputStream;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.jcraft.jsch.ChannelExec;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.Session;

@SpringBootApplication
public class DatabaseApiApplication {

	public static void main(String[] args) throws Exception {
		SpringApplication.run(DatabaseApiApplication.class, args);
	}


}
