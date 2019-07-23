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

export default {
    Logradouro,
    Domicilio
};
