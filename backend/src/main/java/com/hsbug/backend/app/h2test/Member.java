package com.hsbug.backend.app.h2test;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter@Setter
public class Member {

    @Id
    @GeneratedValue
    private Long id;
    private String username;

}
