package com.project.DatabaseAPI.Exceptions;

public class StudentAlreadySignedInException extends Exception {
	public StudentAlreadySignedInException(String errorMessage) {
		super(errorMessage);
	}
}
