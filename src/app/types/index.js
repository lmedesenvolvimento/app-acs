export const Logradouro = {
    tipos: {
        rua: 'Rua',
        avenida: 'Avenida',
        outro: 'Outros'
    }
};

export const Domicilio = {
    cm_tipos: {
        casa: 'Casa',
        apartamento: 'Apartamento',
        comodo: 'Cômodo',
        outro: 'Outro'
    },
    cm_situacao_moradias: {
        proprio: 'Próprio',
        financiado: 'Financiado',
        alugado: 'Alugado',
        cedido: 'Cedido',
        ocupacao: 'Ocupação',
        situacao_rua: 'Situação Rua',
        outra: 'Outra',
    },
    cm_localizacoes: {
        urbana: 'Urbana',
        rural: 'Rural',
    },
    cm_condicao_posses: {
        proprietario: 'Proprietário',
        parceiro: 'Parceiro',
        assentado: 'Assentado',
        posseiro: 'Posseiro',
        arrendatario: 'Arrendatário',
        comodatario: 'Comodatário',
        beneficiario: 'Beneficiário',
        nao_aplica: 'Não Aplica'
    },
    cm_tipo_acessos: {
        pavimento: 'Pavimentado',
        chao_batido: 'Chão batido',
        fluvial: 'Fluvial',
        outro: 'Outro'
    },
    cm_material_alvenarias: {
        com_revestimento: 'Com revestimento',
        sem_revestimento: 'Sem revestimento',
    },
    cm_material_taipas: {
        com_revestimento: 'Com revestimento',
        sem_revestimento: 'Sem revestimento',
    },
    cm_material_outros: {
        madeira_aparelhada: 'Madeira aparelhada',
        madeira_aproveitada: 'Madeira aproveitada',
        palha: 'Palha',
        outro_material: 'Outro Material'
    },
    cm_abastecimento_aguas: {
        rede_encanada: 'Rede encanada',
        poco: 'Poço',
        cisterna: 'Cisterna',
        carro_pipa: 'Carro pipa',
        outro: 'Outro'
    },
    cm_tratamento_aguas: {
        filtracao: 'Filtração',
        fervura: 'Fervura',
        cloracao: 'Cloração',
        mineral: 'Mineral',
        sem_tratamento: 'Sem tratamento'
    },
    cm_escoamento_banheiros: {
        rede_coletora: 'Rede coletora',
        fossa_septica: 'Fossa séptica',
        fossa_rudimentar: 'Fossa rudimentar',
        rio_lago_mar: 'Direto para um Rio, Lago ou Mar',
        ceu_aberto: 'Céu aberto',
        outra_forma: 'Outro forma'
    },
    cm_destino_lixo: {
        coletado: 'Coletado',
        queimado_enterrado: 'Queimado enterrado',
        ceu_aberto: 'Céu aberto',
        outro: 'Outro'
    },
    cm_disponibilidade_eletrica: {
        yes: 'Sim',
        no: 'Não'
    }
};

export const Animais = {
    an_cria_animais: {
        yes: 'Sim',
        no: 'Não'
    },
    an_animais: [
        { key: 'animal_gato', text: 'Gato' },
        { key: 'animal_cachorro', text: 'Cachorro' },
        { key: 'animal_de_criacao', text: 'De criação (porco, galinha...)' },
        { key: 'animal_passaro', text: 'Pássaro' },
        { key: 'animal_outro', text: 'Outros' },
    ]
};

export const Familia = {
    mudou_se: {
        yes: 'Sim',
        no: 'Não'
    },
    renda_familiar: {
        um_quarto: 'Um quarto salário mínimo',
        meio: 'Meio salário mínimo',
        um: 'Um salário mínimo',
        dois: 'Dois salários mínimo',
        tres: 'Três salários mínimo',
        quatro: 'Quatro salários mínimo',
        mais: 'Mais que quatro salários mínimo'
    }
};

export const Individuo = {
    iden_sexo: {
        feminino: 'Feminino',
        masculino: 'Masculino'
    },
    iden_raca: {
        branca: 'Branca',
        preta: 'Preta',
        parda: 'Parda',
        amarela: 'Amarela',
        indigena: 'Indígena'
    },
    iden_nacionalidade: {
        brasileira: 'Brasileira',
        naturalizado: 'Naturalizado',
        estrangeiro: 'Estrangeiro',
    },
    iden_responsavel_familiar: {
        yes: 'Sim',
        no: 'Não'
    },
    is_parentesco_responsavel_familiar: {
        conjuge_companheiro: 'Cônjuge/Companheiro(a)',
        filho: 'Filho(a)',
        enteado: 'Enteado(a)',
        neto_bisneto: 'Neto(a)/Bisneto(a)',
        pai_mae: 'Pai/Mãe',
        sogro: 'Sogro(a)',
        irmao_irma: 'Irmão(a)',
        genro_nora: 'Genro/Nora',
        outro_parente: 'Outro parente',
        nao_parente: 'Não Parente',
    },
    is_frequenta_escola: {
        yes: 'Sim',
        no: 'Não'
    },
    is_curso_elevado_frequentou: {
        creche: 'Creche',
        pre_escola: 'Pré-escola',
        classe_alfabetizacao: 'Classe Alfabetização',
        ensino_fundamental_um_quarta: 'Ensino Fundamental um Quarta',
        ensino_fundamental_quinta_oitava: 'Ensino Fundamental Quinta Oitava',
        ensino_fundamental_completo: 'Ensino Fundamental Completo',
        ensino_fundamental_especial: 'Ensino Fundamental Especial',
        ensino_fundamental_eja_iniciais: 'Ensino Fundamental EJA iniciais',
        ensino_fundamental_eja_finais: 'Ensino Fundamental EJA finais',
        ensino_medio_segundo_ciclo: 'Ensino Médio Segundo Ciclo',
        ensino_medio_especial: 'Ensino Médio Especial',
        ensino_medio_eja: 'Ensino Médio EJA',
        superior: 'Superior',
        alfabetizacao_adultos: 'Alfabetizacao Adultos',
        nenhum: 'Nenhum'
    },
    is_situacao_mercado_trabalho: {
        empregador: 'Empregador',
        assalariado_com_carteira: 'Assalariado com carteira',
        assalariado_sem_carteira: 'Assalariado sem carteira',
        autonomo_com_previdencia: 'Autônomo com previdencia',
        autonomo_sem_previdencia: 'Autônomo sem previdencia',
        aposentado: 'Aposentado',
        desempregado: 'Desempregado',
        nao_trabalha: 'Não Trabalha',
        servidor_publico: 'Servidor Público',
        outro: 'Outro'
    },
    is_orientacao_sexual: {
        heterossexual: 'Heterossexual',
        homossexual: 'Homossexual(gay/lésbica)',
        bissexual: 'Bissexual',
        outra: 'Outra'
    },
    is_identidade_genero: {
        homem_transexual: 'Homem transexual',
        mulher_transexual: 'Mulher transexual',
        travesti: 'Travesti',
        outro: 'Outro'
    },
    is_criancas_cuidadores: [
        { key: 'criancas_adulto_responsavel', text: 'Adulto Responsável' },
        { key: 'criancas_outra_crianca', text: 'Outra(s) Criança(s)' },
        { key: 'criancas_adolescente', text: 'Adolecente' },
        { key: 'criancas_sozinha', text: 'Sozinha' },
        { key: 'criancas_creche', text: 'Creche' },
        { key: 'criancas_outro', text: 'Outro' },
    ],
    is_deficiencias: [
        { key: 'deficiencia_auditiva', text: 'Deficiência auditiva' },
        { key: 'deficiencia_visual', text: 'Deficiência visual' },
        { key: 'deficiencia_intelectual', text: 'Deficiência intelectual' },
        { key: 'deficiencia_fisica', text: 'Deficiência física' },
        { key: 'deficiencia_outra', text: 'Outra' },
    ],
    is_frequenta_cuidador_tradicional: {
        yes: 'Sim',
        no: 'Não'
    },
    is_participa_grupo_comunitario: {
        yes: 'Sim',
        no: 'Não'
    },
    is_possui_plano_saude: {
        yes: 'Sim',
        no: 'Não'
    },
    is_e_membro_comunidade: {
        yes: 'Sim',
        no: 'Não'
    },
    is_informar_orientacao_sexual: {
        yes: 'Sim',
        no: 'Não'
    },
    is_informar_identidade_genero: {
        yes: 'Sim',
        no: 'Não'
    },
    is_possui_deficiencia: {
        yes: 'Sim',
        no: 'Não'
    },
    sc_tipo: {
        mudanca_territorio: 'Mudança de Territorio',
        obito: 'Óbito'
    },
    cs_peso: {
        abaixo_peso: 'Abaixo do peso',
        peso_adequado: 'Peso adequado',
        acima_peso: 'Acima do peso',
    },
    cs_doencas_coracao: [
        { key: 'doenca_cardiaca_insuficiencia_cardiaca', text: 'Insuficiência cardíaca' },
        { key: 'doenca_cardiaca_outra', text: 'Outro' },
        { key: 'doenca_cardiaca_nao_sabe', text: 'Não sabe' },
    ],
    cs_problemas_rins: [
        { key: 'problema_rins_insuficiencia_renal', text: 'Insuficiência renal' },
        { key: 'problema_rins_outro', text: 'Outro' },
        { key: 'problema_rins_nao_sabe', text: 'Não sabe' },
    ],
    cs_doencas_respiratorias: [
        { key: 'doenca_respiratoria_asma', text: 'Asma' },
        { key: 'doenca_respiratoria_dpoc_esfisema', text: 'DPOC/Enfisema' },
        { key: 'doenca_respiratoria_outra', text: 'Outra' },
        { key: 'doenca_respiratoria_nao_sabe', text: 'Não sabe' },
    ],
    cs_esta_gestante: {
        yes: 'Sim',
        no: 'Não'
    },
    cs_esta_fumante: {
        yes: 'Sim',
        no: 'Não'
    },
    cs_usa_alcool: {
        yes: 'Sim',
        no: 'Não'
    },
    cs_usa_drogas: {
        yes: 'Sim',
        no: 'Não'
    },
    cs_tem_hipertensao_arterial: {
        yes: 'Sim',
        no: 'Não'
    },
    cs_tem_diabetes: {
        yes: 'Sim',
        no: 'Não'
    },
    cs_teve_avc: {
        yes: 'Sim',
        no: 'Não'
    },
    cs_teve_infarto: {
        yes: 'Sim',
        no: 'Não'
    },
    cs_tem_doenca_cardiaca: {
        yes: 'Sim',
        no: 'Não'
    },
    cs_tem_teve_problemas_rins: {
        yes: 'Sim',
        no: 'Não'
    },
    cs_tem_doenca_respiratoria: {
        yes: 'Sim',
        no: 'Não'
    },
    cs_esta_com_hanseniase: {
        yes: 'Sim',
        no: 'Não'
    },
    cs_esta_com_turberculose: {
        yes: 'Sim',
        no: 'Não'
    },
    cs_tem_teve_cancer: {
        yes: 'Sim',
        no: 'Não'
    },
    cs_teve_internacao: {
        yes: 'Sim',
        no: 'Não'
    },
    cs_teve_problema_saude_mental: {
        yes: 'Sim',
        no: 'Não'
    },
    cs_esta_acamado: {
        yes: 'Sim',
        no: 'Não'
    },
    cs_esta_domiciliado: {
        yes: 'Sim',
        no: 'Não'
    },
    cs_usa_plantas_medicinais: {
        yes: 'Sim',
        no: 'Não'
    },
    cs_usa_praticas_integrativas: {
        yes: 'Sim',
        no: 'Não'
    },
    sr_tempo_rua: {
        menor_seis_meses: 'Menos de que 6 meses',
        seis_a_doze_meses: '6-12 meses',
        um_a_cinco_anos: '1-5 anos',
        maior_cinco_anos: 'Mais do que 5 anos',
    },
    sr_vezes_alimenta_dia: {
        uma: 'Uma',
        duas_ou_tres: 'Duas ou três',
        mais_de_tres: 'Mais de três',
    },
    sr_origem_alimentacao: [
        { key: 'origem_alimentacao_restaurante_popular', text: 'Restaurante popular' },
        { key: 'origem_alimentacao_doacao_restaurante', text: 'Doação grupo religioso' },
        { key: 'origem_alimentacao_doacao_popular', text: 'Doação restaurante' },
        { key: 'origem_alimentacao_doacao_grupo_religioso', text: 'Doação de popular' },
        { key: 'origem_alimentacao_outras', text: 'Outras' },
    ],
    sr_higiene_pessoal: [
        { key: 'higiene_pessoal_banho', text: 'Banho' },
        { key: 'higiene_pessoal_acesso_sanitario', text: 'Acesso sanitario' },
        { key: 'higiene_pessoal_higiene_bucal', text: 'Higiene Bucal' },
        { key: 'higiene_pessoal_outras', text: 'Outras' },
    ],
    sr_tem_higiene_pessoal: {
        yes: 'Sim',
        no: 'Não'
    },
    sr_esta_situacao_rua: {
        yes: 'Sim',
        no: 'Não'
    },
    sr_recebe_beneficio: {
        yes: 'Sim',
        no: 'Não'
    },
    sr_possui_referencia_familiar: {
        yes: 'Sim',
        no: 'Não'
    },
    sr_acompanhado_outra_instituicao: {
        yes: 'Sim',
        no: 'Não'
    },
    sr_visita_familiar: {
        yes: 'Sim',
        no: 'Não'
    }
};


export const Visita = {
    turno: {
        manha: 'Manhã',
        tarde: 'Tarde',
        noite: 'Noite'
    },
    tipo_imovel: {
        domicilio: 'Domicilio',
        comercio: 'Comércio',
        terreno_baldio: 'Terreno Baldio',
        ponto_estrategico: 'Ponto Estrategico',
        escola: 'Escola',
        creche: 'Creche',
        abrigo: 'Abrigo',
        instituicao_idosos: 'Instituição de idosos',
        unidade_prisional: 'Unidade Prisional',
        unidade_socioeducativa: 'Unidade socioeducativa',
        delegacia: 'Delegacia',
        estabelecimento_religioso: 'Estabelecimento religioso',
        outros: 'Outros'
    },
    desfecho: {
        visita_realizada: 'Visita realizada',
        visita_recusada: 'Visita recusada',
        ausente: 'Ausente'
    }
};

export const Motivo = {
    motivos: [
        {
            title: 'Busca ativa',
            data: [
                { key: 'busca_consulta', text: 'Consulta' },
                { key: 'busca_exame', text: 'Exame' },
                { key: 'busca_vacina', text: 'Vacina' },
                { key: 'busca_bolsa_familia', text: 'Bolsa Família' },
            ]
        },
        {
            title: 'Acompanhamento',
            data: [
                { key: 'acompanhamento_gestante', text: 'Gestante' },
                { key: 'acompanhamento_puerpera', text: 'Puerpera' },
                { key: 'acompanhamento_recem_nascido', text: 'Recém Nascido' },
                { key: 'acompanhamento_crianca', text: 'Criança' },
                { key: 'acompanhamento_desnutricao', text: 'Desnutrição' },
                { key: 'acompanhamento_reabilitacao', text: 'Reabilitação' },
                { key: 'acompanhamento_hipertensao', text: 'Hipertensão' },
                { key: 'acompanhamento_diabetes', text: 'Diabetes' },
                { key: 'acompanhamento_asma', text: 'Asma' },
                { key: 'acompnhamento_dpoc_enfisema', text: 'Acompnhamento DPOC enfisema' },
                { key: 'acompanhamento_cancer', text: 'Câncer' },
                { key: 'acompanhamento_outras_doencas_cronicas', text: 'Outras doencas crônicas' },
                { key: 'acompanhamento_hanseniase', text: 'Hanseníase' },
                { key: 'acompanhamento_tuberculose', text: 'Tuberculose' },
                { key: 'acompanhamento_sintomaticos_respiratorios', text: 'Sintomáticos respiratórios' },
                { key: 'acompanhamento_tabagista', text: 'Tabagista' },
                { key: 'acompanhamento_acamados', text: 'Acamados' },
                { key: 'acompanhamento_vulnerabilidade_social', text: 'Vulnerabilidade social' },
                { key: 'acompanhamento_bolsa_familia', text: 'Bolsa Familia' },
                { key: 'acompanhamento_saude_mental', text: 'Saúde mental' },
                { key: 'acompanhamento_alcool', text: 'Álcool' },
                { key: 'acompanhamento_outras_drogas', text: 'Outras drogas' },
            ]
        },
        {
            title: 'Controle vetorial ação educativa',
            data: [
                { key: 'controle_vetorial_acao_educativa', text: 'Ação educativa' },
                { key: 'controle_vetorial_imovel_foco', text: 'Imóvel foco' },
                { key: 'controle_vetorial_acao_mecanica', text: 'Ação mecânica' },
                { key: 'controle_vetorial_tratamento_focal', text: 'Tratamento focal' },
            ]
        },
        {
            title: 'Outros',
            data: [
                { key: 'visita_periodica', text: 'Visita periódica' },
                { key: 'cadastramento_atualizacao', text: 'Cadastramento Atualizacao' },
                { key: 'convite_atividades_coletivas', text: 'Convite atividades coletivas' },
                { key: 'orientacao_prevencao', text: 'Orientação prevencao' },
                { key: 'egresso_internacao', text: 'Egresso internação' },
                { key: 'outro', text: 'Outro' }
            ]
        }
    ]
};

export default {
    Logradouro,
    Domicilio,
    Familia,
    Visita
};
