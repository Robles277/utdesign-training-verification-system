package com.project.DatabaseAPI.Services;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

@WebListener 
public class MyContextListener implements ServletContextListener {
	private SSHConnection conexionssh;

	public MyContextListener() {
		super();
	}


	public void contextInitialized(ServletContextEvent arg0) {
		System.out.println("Context initialized ... !");
		try {
			conexionssh = new SSHConnection();
		} catch (Throwable e) {
			e.printStackTrace(); // error connecting SSH server
		}
	}

	/**
	 * @see ServletContextListener#contextDestroyed(ServletContextEvent)
	 */
	public void contextDestroyed(ServletContextEvent arg0) {
		System.out.println("Context destroyed ... !");
		conexionssh.closeSSH(); // disconnect
	}
}
