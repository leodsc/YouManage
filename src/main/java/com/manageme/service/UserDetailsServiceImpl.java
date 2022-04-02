package com.manageme.service;

import com.manageme.ManagemeApplication;
import com.manageme.repository.ManagerRepository;
import com.manageme.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private ManagerRepository managerRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return managerRepo.findByNameContainingIgnoreCase(username)
                .map(resp -> new UserDetailsImpl(resp.getName(), resp.getPassword()))
                .orElseThrow(() ->
                        new UsernameNotFoundException(String.format("Usuário %s não foi encontrado.", username)));

    }
}
