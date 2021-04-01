package com.project.DatabaseAPI.Services;

import com.jcraft.jsch.JSch;
import com.jcraft.jsch.Session;

public class SSHConnection {

	private final static String S_PATH_FILE_PRIVATE_KEY = "/Users/Simeon Soname/.ssh/id_rsa";
	private final static String S_PATH_FILE_KNOWN_HOSTS = "/Users/Simeon Soname/.ssh/known_hosts";
	private final static String S_PASS_PHRASE = "hax0r";
	private final static int LOCAl_PORT = 3306;
	private final static int REMOTE_PORT = 2022; 
	private final static int SSH_REMOTE_PORT = 2022;
	private final static String SSH_USER = "simeon";
	private final static String SSH_PASSWORD = "Soname";
	private final static String SSH_REMOTE_SERVER = "66.253.176.71";
	private final static String MYSQL_REMOTE_SERVER = "127.0.0.1"; 


	private Session sesion; // represents each ssh session

	public void closeSSH() {
		sesion.disconnect();
	}

	public SSHConnection() throws Throwable {
		
		JSch jsch = null;

		jsch = new JSch();
		jsch.setKnownHosts(S_PATH_FILE_KNOWN_HOSTS);
		jsch.addIdentity(S_PATH_FILE_PRIVATE_KEY, S_PASS_PHRASE.getBytes());

		sesion = jsch.getSession(SSH_USER, SSH_REMOTE_SERVER, SSH_REMOTE_PORT);
		sesion.connect(); // ssh connection established!

		// by security policy, you must connect through a fowarded port
		sesion.setPortForwardingL(LOCAl_PORT, MYSQL_REMOTE_SERVER, REMOTE_PORT);

	}
}
