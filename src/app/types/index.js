export const Logradouro = {
    tipos: {
        rua: 'Rua',
        avenida: 'Avenida',
        outros: 'Outros'
    }
};

export const Domicilio = {
    cm_tipos: {
        casa: 'Casa',
        apartamento: 'Apartamento',
        comodo: 'Comodo',
        outro: 'Outro'
    },
    cm_situacao_moradias: {
        proprio: 'Próprio',
        financiado: 'Financiado',
        alugado: 'Alugado',
        cedido: 'Cedido',
        ocupacao: 'Ocupacao',
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
        arrendatario: 'Arrendatario',
        comodatario: 'Comodatário',
        beneficiario: 'Beneficiario',
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
        poco: 'Poco',
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
        rio_lago_mar: 'Rio lago mar',
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
        Parda: 'Parda',
        amarela: 'Amarela',
        indigena: 'Indígena'
    },
    iden_nacionalidade: {
        brasileira: 'Brasileira',
        naturalizado: 'Naturalizado',
        estrangeiro: 'estrangeiro',
    },
    iden_responsavel_familiar: {
        yes: 'Sim',
        no: 'Não'
    },
    is_parentesco_responsavel_familiar: {
        conjuge: 'Conjuge/Companheiro(a)',
        filho: 'Filho(a)',
        enteado: 'Enteado(a)',
        neto: 'Neto(a)/Bisneto(a)',
        pai: 'Pai/Mãe',
        sogro: 'Sogro(a)',
        irmao: 'Irmão(a)',
        genro: 'Genro/Nora',
        outros: 'Outro parente',
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
    is_informar_orientacao_sexual: {
        heterossexual: 'Heterossexual',
        homossexual: 'Homossexual(gay/lésbica)',
        bissexual: 'Bissexual',
        outra: 'Outra'
    },
    is_informar_identidade_genero: {
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
    is_deseja_informar_orientacao_sexual: {
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
    sr_origem_alimentacao: {
        origem_alimentacao_restaurante_popular: 'Restaurante popular',
        origem_alimentacao_doacao_grupo_religioso: 'Doação grupo religioso',
        origem_alimentacao_doacao_restaurante: 'Doação restaurante',
        origem_alimentacao_doacao_popular: 'Doação de popular',
        origem_alimentacao_outras: 'Outras',
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
            title: 'Cadastramento Atualizacao',
            data: [
                { key: 'cadastramento_atualizacao', text: 'Cadastramento Atualizacao' },
            ]
        },
        {
            title: 'Visita periódica',
            data: [
                { key: 'visita_periodica', text: 'Visita periódica' },
            ]
        },
        {
            title: 'Busca consulta',
            data: [
                { key: 'busca_consulta', text: 'Busca consulta' },
                { key: 'busca_exame', text: 'Busca exame' },
                { key: 'busca_vacina', text: 'Busca vacina' },
                { key: 'busca_bolsa_familia', text: 'Busca bolsa familia' },
            ]
        },
        {
            title: 'Acompanhamento gestante',
            data: [
                { key: 'acompanhamento_gestante', text: 'Acompanhamento gestante' },
                { key: 'acompanhamento_puerpera', text: 'Acompanhamento puerpera' },
                { key: 'acompanhamento_recem_nascido', text: 'Acompanhamento recém nascido' },
                { key: 'acompanhamento_crianca', text: 'Acompanhamento crianca' },
                { key: 'acompanhamento_desnutricao', text: 'Acompanhamento desnutricao' },
                { key: 'acompanhamento_reabilitacao', text: 'Acompanhamento reabilitacao' },
                { key: 'acompanhamento_hipertensao', text: 'Acompanhamento hipertensao' },
                { key: 'acompanhamento_diabetes', text: 'Acompanhamento diabetes' },
                { key: 'acompanhamento_asma', text: 'Acompanhamento asma' },
                { key: 'acompnhamento_dpoc_enfisema', text: 'Acompnhamento DPOC enfisema' },
                { key: 'acompanhamento_cancer', text: 'Acompanhamento cancer' },
                { key: 'acompanhamento_outras_doencas_cronicas', text: 'Acompanhamento outras doencas crônicas' },
                { key: 'acompanhamento_hanseniase', text: 'Acompanhamento hanseniase' },
                { key: 'acompanhamento_tuberculose', text: 'Acompanhamento tuberculose' },
                { key: 'acompanhamento_sintomaticos_respiratorios', text: 'Acompanhamento sintomaticos respiratorios' },
                { key: 'acompanhamento_tabagista', text: 'Acompanhamento tabagista' },
                { key: 'acompanhamento_acamados', text: 'Acompanhamento acamados' },
                { key: 'acompanhamento_vulnerabilidade_social', text: 'Acompanhamento vulnerabilidade social' },
                { key: 'acompanhamento_bolsa_familia', text: 'Acompanhamento bolsa familia' },
                { key: 'acompanhamento_saude_mental', text: 'Acompanhamento saude mental' },
                { key: 'acompanhamento_alcool', text: 'Acompanhamento alcool' },
                { key: 'acompanhamento_outras_drogas', text: 'Acompanhamento outras drogas' },
            ]
        },
        {
            title: 'Controle vetorial ação educativa',
            data: [
                { key: 'controle_vetorial_acao_educativa', text: 'Controle vetorial ação educativa' },
                { key: 'controle_vetorial_imovel_foco', text: 'Controle vetorial imóvel foco' },
                { key: 'controle_vetorial_acao_mecanica', text: 'Controle vetorial ação mecânica' },
                { key: 'controle_vetorial_tratamento_focal', text: 'Controle vetorial tratamento focal' },
            ]
        },
        {
            title: 'Egresso internação',
            data: [
                { key: 'egresso_internacao', text: 'Egresso internação' },
            ]
        },
        {
            title: 'Convite atividades coletivas',
            data: [
                { key: 'convite_atividades_coletivas', text: 'Convite atividades coletivas' },
            ]
        },
        {
            title: 'Orientação prevencao',
            data: [
                { key: 'orientacao_prevencao', text: 'Orientação prevencao' },
            ]
        },
        {
            title: 'Outro',
            data: [
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
