package com.manageme.exceptions;

public class EmployeeNotFoundException extends Exception {

    @Override
    public String getMessage() {
        return "Funcionário não existe!";
    }
}
