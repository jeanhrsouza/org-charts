export interface d3Values {
  id: string;
  parentId: any;
  pessoa: {
    nome_guerra: string;
    email: string;
  };
  perfil_funcionario: {
    codigo_perfil: string;
    metodologia: {
      codigo: string;
      descricao: string;
    };
    descricao: string;
    nome_perfil: string;
    area: string;
    office: string;
    positionName: string;
  };
  qtd_hrs_semana: number;
  tags: string;
  imageUrl: string;
}
