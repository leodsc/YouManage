package com.manageme.exceptions;

public class ManagerDoesntExistException extends Exception {

    @Override
    public String getMessage() {
        return "O gerente não existe";
    }
}
