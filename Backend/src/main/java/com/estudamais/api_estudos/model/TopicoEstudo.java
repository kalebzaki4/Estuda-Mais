package com.estudamais.api_estudos.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TopicoEstudo {
    private Long id;
    private String nome;
    private String ultimaSessao;
    private String tempoTotal;
    private String progresso;
    private String avatar;
    private String description;
    private Integer sessionsCompleted;
    private List<String> recentActivities;
    private List<String> youtubeLinks;
}