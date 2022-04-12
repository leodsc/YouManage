package com.manageme.exceptions;

public class ManagerAlreadyExistsException extends Exception {

    @Override
    public String getMessage() {
        return "Gerente já existe!";
    }
}
